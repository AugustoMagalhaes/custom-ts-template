import chalk from 'chalk';
import fs from 'fs/promises';
import { createSpinner } from 'nanospinner';
import readAndParse from './readTsconfig.js';
import sleep from './sleep.js';
import allStandardOptions from './standardTsconfigs.js';

export async function writeRecommendedOptions(secondaryMap, nodeVersion = 16) {
  const recommendedConfig = allStandardOptions[`node${nodeVersion}`];

  for (let [key, value] of secondaryMap.entries()) {
    recommendedConfig[key] = value;
  }

  const stringifiedRecommendedConfig = JSON.stringify(recommendedConfig, null, 2);

  const spinner = createSpinner(chalk.green('Generating tsconfig.json ...')).start();
  try {
    await fs.writeFile('./tsconfig.json', stringifiedRecommendedConfig);
    await sleep();
    spinner.success({ text: chalk.bold.green('tsconfig.json created sucessfully!') });
  } catch (err) {
    spinner.error({ text: chalk.red(e.message) });
  }
}

export async function writeCustomOptions(secondaryMap, nodeVersion = 16) {
  const parsedTsConfig = await readAndParse();

  if (parsedTsConfig) {
    parsedTsConfig['extends'] = `@tsconfig/node${nodeVersion}/tsconfig.json`;

    for (let [key, value] of secondaryMap.entries()) {
      parsedTsConfig[key] = value;
    }
  }
  const stringifiedCustomTsconfig = JSON.stringify(parsedTsConfig, null, 2);

  const spinner = createSpinner(chalk.green('Customizing tsconfig.json data ...')).start();
  try {
    await fs.writeFile('./tsconfig.json', stringifiedCustomTsconfig);
    await sleep();
    spinner.success({ text: chalk.bold.green('tsconfig.json customized sucessfully!') });
  } catch (err) {
    spinner.error({ text: chalk.red(e.message) });
  }
}
