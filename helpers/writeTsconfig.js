import chalk from 'chalk';
import fs from 'fs/promises';
import { createSpinner } from 'nanospinner';
import sleep from './sleep.js';
import allStandardOptions from './standardTsconfigs.js';

export async function writeRecommendedOptions(secondaryMap, nodeVersion = 16) {
  const recommendedConfig = allStandardOptions[`node${nodeVersion}`];

  for (let [key, value] of secondaryMap.entries()) {
    recommendedConfig[key] = value;
  }

  const stringifiedRecommendedConfig = JSON.stringify(recommendedConfig, null, 2);

  try {
    const spinner = createSpinner(chalk.green('Generating tsconfig.json ...')).start();
    await fs.writeFile('./tsconfig.json', stringifiedRecommendedConfig);
    await sleep();
    spinner.success({ text: chalk.bold.green('tsconfig.json created sucessfully!') });
  } catch (err) {
    spinner.error({ text: chalk.red(e.message) });
  }
}
