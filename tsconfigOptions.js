const customTsconfig = new Map([
  ['--target', ['ES2015', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext']],
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

async function askTsconfigOptions() {
  for (let [key, value] of customTsconfig.entries()) {
    console.clear();
    const answer = await inquirer.prompt({
      name: key,
      type: 'list',
      message: `Which config would you like to set for ${chalk.bold.green(
        key,
      )} of tsconfig's option? \n Doc: ${chalk.blue(tsconfigInfo.get(key))}:`,
      choices: value,
      default() {
        return value[0];
      },
    });

    customTsconfig.set(key, answer[key]);
  }
  await askRootAndOutdir('--rootDir', './src');
  await askRootAndOutdir('--outDir', './dist');
  return generateTsconfigCommand(customTsconfig);
}

async function askRootAndOutdir(dirOption, dirDefault) {
  const answers = await inquirer.prompt({
    name: dirOption,
    type: 'input',
    message: `Please type the source of your ${chalk.green(
      dirOption,
    )} directory (e.g ${dirDefault}):`,
    default() {
      return dirDefault;
    },
  });
  customTsconfig.set(dirOption, answers[dirOption]);
}

function generateTsconfigCommand(set) {
  let command = 'npx tsc --init ';
  for (let [key, value] of set.entries()) {
    command += `${key} ${value} `;
  }
  const trimmedCommand = command.trim();
  return trimmedCommand;
}
