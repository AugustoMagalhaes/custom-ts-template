import chalk from 'chalk';
import fs from 'fs/promises';
import { createSpinner } from 'nanospinner';
import sleep from './sleep.js';

export default async function writeAuxFiles(contentFile, writePath, name) {
  const spinner = createSpinner(chalk.green(`Generating ${name} ...`)).start();
  try {
    await fs.writeFile(writePath, contentFile);
    await sleep();
    spinner.success({ text: chalk.bold.green(`${name} created sucessfully!`) });
  } catch (err) {
    spinner.error({ text: chalk.red(e.message) });
  }
}
