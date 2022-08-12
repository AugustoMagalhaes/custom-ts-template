import chalk from 'chalk';
import inquirer from 'inquirer';
import { getNodeVersion } from './src/installer.js';

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
  ['--skipLibCheck', `(${tsconfigDocUrl}#skipDefaultLibCheck`],
  ['--forceConsistentCasingInFileNames', `(${tsconfigDocUrl}#forceConsistentCasingInFileNames)`],
  ['--preserveConstEnums', `(${tsconfigDocUrl}#preserveConstEnums)`],
]);

async function askRecommendedOrCustomOptions() {
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
    console.log('not Implemented');
  } else {
    await askCustomTsConfigOptions();
  }
}
async function askRootAndOutdir(dirOption, dirDefault) {
  console.clear();

  const answer = await inquirer.prompt({
    name: dirOption,
    type: 'input',
    message: `Please enter the destination of your custom ${chalk.green(
      dirOption,
    )} directory: (press 'Enter' for default)`,
    default() {
      return dirDefault;
    },
  });

  customTsconfig.set(dirOption, answer[dirOption]);
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

  Promise.all([
    await askRootAndOutdir('--rootDir', './src'),
    await askRootAndOutdir('--outDir', './dist'),
  ]);

  return generateTsconfigCommand(customTsconfig);
}

function generateTsconfigCommand(set) {
  let command = 'npx tsc --init ';
  for (let [key, value] of set.entries()) {
    command += `${key} ${value} `;
  }
  const trimmedCommand = command.trim();
  return trimmedCommand;
}
