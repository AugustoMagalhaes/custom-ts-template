import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import sleep from '../helpers/sleep.js';
import { writeCustomOptions, writeRecommendedOptions } from '../helpers/writeTsconfig.js';
import { asyncExec, getNodeVersion } from './installer.js';

const customTsconfig = new Map([
  ['--target', ['es6', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext']],
  ['--module', ['commonjs', 'es6', 'es2020', 'es2021', 'esnext', 'node16', 'nodenext']],
  ['--allowJs', ['true', 'false']],
  ['--strict', ['true', 'false']],
  ['--esModuleInterop', ['true', 'false']],
  ['--skipLibCheck', ['true', 'false']],
  ['--forceConsistentCasingInFileNames', ['true', 'false']],
  ['--preserveConstEnums', ['true', 'false']],
]);

const tsconfigDocUrl = 'https://www.typescriptlang.org/tsconfig';

const tsconfigInfo = new Map([
  ['--target', `(${tsconfigDocUrl}#target)`],
  ['--module', `(${tsconfigDocUrl}#module)`],
  ['--allowJs', `(${tsconfigDocUrl}#allowJs)`],
  ['--strict', `(${tsconfigDocUrl}#strict)`],
  ['--esModuleInterop', `(${tsconfigDocUrl}#esModuleInterop)`],
  ['--skipLibCheck', `(${tsconfigDocUrl}#skipDefaultLibCheck)`],
  ['--forceConsistentCasingInFileNames', `(${tsconfigDocUrl}#forceConsistentCasingInFileNames)`],
  ['--preserveConstEnums', `(${tsconfigDocUrl}#preserveConstEnums)`],
]);

const secondaryTsConfigInfo = new Map([
  ['include', ['src/**/*']],
  ['exclude', ['node_modules']],
]);

async function askExcludeOption() {
  console.clear();

  const warningMessage = chalk.bold.yellow(
    `Type only the content of the second array option, 'node_modules' comes by default... \n (e.g: type **/*.spec.ts (no quotes needed) for ["node_modules", "**/*.spec.ts"])`,
  );

  const answer = await inquirer.prompt({
    name: 'exclude',
    type: 'input',
    message: `Please enter the destination of your custom ${chalk.green(
      'exclude',
    )} config: \n ${warningMessage} \n`,
    default() {
      return '**/*.spec.ts';
    },
  });

  const resultAnswer = answer['exclude'];

  if (resultAnswer) {
    const defaultExcludeValue = secondaryTsConfigInfo.get('exclude');
    const newExcludeValue = [...defaultExcludeValue, resultAnswer];
    secondaryTsConfigInfo.set('exclude', newExcludeValue);
  }
}

function formatString(str, pattern, replacedStr) {
  const formattedString = str.replace(pattern, replacedStr);
  return formattedString;
}

async function handleChoices(choice) {
  if (choice === 'none') {
    secondaryTsConfigInfo.clear();
    return;
  }

  const splitedChoice = choice.split('/');

  if (splitedChoice.includes('include')) {
    const rootDir = formatString(customTsconfig.get('--rootDir'), './', '');
    const includeDirContent = secondaryTsConfigInfo.get('include')[0];
    const newIncludeDirContent = formatString(includeDirContent, 'src', rootDir);
    secondaryTsConfigInfo.set('include', [newIncludeDirContent]);
  } else {
    secondaryTsConfigInfo.delete('include');
  }

  await askExcludeOption();
}

async function askYesOrNoIncludeExclude() {
  console.clear();

  const choices = ['include/exclude', 'exclude', 'none'];
  const rootDirName = customTsconfig.get('--rootDir').replace('./', '');

  const answer = await inquirer.prompt({
    name: 'includeOrExclude',
    type: 'list',
    message: `Would you like to set ${chalk.green('include/exclude')} options? (${chalk.yellow(
      'default',
    )}: include: ['${rootDirName}/**/*'], exclude: ['node_modules', '**YourChoice**'])`,
    choices,
    default() {
      return choices[0];
    },
  });

  const resultAnswer = answer.includeOrExclude;

  await handleChoices(resultAnswer);
}

async function askRootAndOutdir(dirOption, dirDefault) {
  console.clear();

  const answer = await inquirer.prompt({
    name: dirOption,
    type: 'input',
    message: `Please enter the destination of your custom ${chalk.green(
      dirOption,
    )} directory: (press 'Enter' for default) \n`,
    default() {
      return dirDefault;
    },
  });

  const resultAnswer = answer[dirOption];

  customTsconfig.set(dirOption, resultAnswer);
}

async function generateCustomTsconfig() {
  const spinner = createSpinner(chalk.green('Generating custom tsconfig.json ...')).start();
  sleep();

  try {
    const command = generateTsconfigCommand(customTsconfig);
    const { stdout, _stderr } = await asyncExec(command);

    console.log(`\n ${stdout}`);

    spinner.success({ text: chalk.bold.green('Custom tsconfig.json created sucessfully!') });

    return stdout;
  } catch (e) {
    spinner.error({ text: chalk.red(e.message) });
  }
}

async function askCustomTsConfigOptions() {
  for (let [key, value] of customTsconfig.entries()) {
    console.clear();

    const answer = await inquirer.prompt({
      name: key,
      type: 'list',
      message: `Which config would you like to set for tsconfig's ${chalk.bold.green(
        key,
      )} option? \n Doc: ${chalk.blue(tsconfigInfo.get(key))}`,
      choices: value,
      default() {
        return value[0];
      },
    });

    customTsconfig.set(key, answer[key]);
  }

  const nodeVersion = getNodeVersion();

  Promise.all([
    await askRootAndOutdir('--rootDir', './src'),
    await askRootAndOutdir('--outDir', './dist'),
    await askYesOrNoIncludeExclude(),
    await generateCustomTsconfig(),
    await writeCustomOptions(secondaryTsConfigInfo, nodeVersion || 16),
  ]);
}

async function askRecommendedOrCustomOptions() {
  console.clear();
  const nodeVersion = getNodeVersion();

  const answer = await inquirer.prompt({
    name: 'recommendedOrCustom',
    type: 'list',
    message: `Would you like to generate a recommended tsconfig for your node version (${nodeVersion}) or a custom one?`,
    choices: ['Recommended', 'Custom'],
    default() {
      return 'Recommended';
    },
  });

  if (answer.recommendedOrCustom === 'Recommended') {
    Promise.all([
      await askRootAndOutdir('--rootDir', './src'),
      await askRootAndOutdir('--outDir', './dist'),
      await askYesOrNoIncludeExclude(),
      await writeRecommendedOptions(secondaryTsConfigInfo /* nodeVersion */),
    ]);
  } else {
    await askCustomTsConfigOptions();
  }
}

function generateTsconfigCommand(set) {
  let command = 'npx tsc --init ';
  for (let [key, value] of set.entries()) {
    command += `${key} ${value} `;
  }
  const trimmedCommand = command.trim();
  return trimmedCommand;
}

await askRecommendedOrCustomOptions();
