import fs from 'fs/promises';
import { createSpinner } from 'nanospinner';
import { customRead } from './readTsconfig.js';

export default async function writeAuxFiles(contentPath, writePath, name) {
  try {
    const spinner = createSpinner(chalk.green(`Generating ${name} ...`)).start();
    const data = await customRead(contentPath);
    await fs.writeFile(writePath, data);
    await sleep();
    spinner.success({ text: chalk.bold.green(`${name} created sucessfully!`) });
  } catch (err) {
    spinner.error({ text: chalk.red(e.message) });
  }
}
