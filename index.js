#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import { exec } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import util from 'util';

const asyncExec = util.promisify(exec);

let nodeVersion;
let database;
let hasExpress;
let hasHttpStatusCodes = '';
let hasExpressAsyncErrors = '';
let hasRestifyErrors = '';
let hasJoi = '';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to the Typescript template creator!');
  await sleep();
  console.log(
    chalk.blue('If you want the default installation, just press Enter consecutively... \n'),
  );
  await sleep(2500);
  rainbowTitle.stop();
}

async function askDatabaseList() {
  const answers = await inquirer.prompt({
    name: 'Database',
    type: 'list',
    message:
      'Which database driver would you like to use with your Typescript project? \n Drivers: \n',
    choices: ['mysql2', 'mongodb', 'postgres'],
    default() {
      return 'mysql2';
    },
  });

  database = answers.Database;
}

async function askNodeList() {
  const answers = await inquirer.prompt({
    name: 'Node',
    type: 'list',
    message:
      'Which version of Node would you like to use with your Typescript project? \n Versions: \n',
    choices: ['16', '14', '12', '10'],
    default() {
      return '16';
    },
  });

  nodeVersion = answers.Node;
}

async function askExpressList() {
  const answers = await inquirer.prompt({
    name: 'Express',
    type: 'list',
    message: 'Will your project use Express for backend development?: \n',
    choices: ['No', 'Yes'],
    default() {
      return 'No';
    },
  });

  hasExpress = answers.Express === 'Yes' ? 'express -D @types/express' : '';
}

async function askHttpStatusCodesList() {
  const answers = await inquirer.prompt({
    name: 'Http',
    type: 'list',
    message:
      'Would you like to include the "http-status-codes" library to your express project?: \n',
    choices: ['No', 'Yes'],
    default() {
      return 'No';
    },
  });

  hasHttpStatusCodes = answers.Http === 'Yes' ? 'http-status-codes' : '';
}

async function askExpressAsyncErrorsList() {
  const answers = await inquirer.prompt({
    name: 'asyncErrors',
    type: 'list',
    message:
      'Would you like to include the "express-async-errors" library to your express project?: \n',
    choices: ['No', 'Yes'],
    default() {
      return 'No';
    },
  });

  hasExpressAsyncErrors = answers.asyncErrors === 'Yes' ? 'express-async-errors' : '';
}

async function askRestifyErrorsList() {
  const answers = await inquirer.prompt({
    name: 'restifyErrors',
    type: 'list',
    message: 'Would you like to include the "restify-errors" library to your express project?: \n',
    choices: ['No', 'Yes'],
    default() {
      return 'No';
    },
  });

  hasRestifyErrors = answers.restifyErrors === 'Yes' ? 'restify-errors @types/restify-errors' : '';
}

async function askJoiList() {
  const answers = await inquirer.prompt({
    name: 'joi',
    type: 'list',
    message: 'Would you like to include the "joi" library to your express project?: \n',
    choices: ['No', 'Yes'],
    default() {
      return 'No';
    },
  });

  hasJoi = answers.joi === 'Yes' ? '-D joi' : '';
}

Promise.all([
  await welcome(),
  await askDatabaseList(),
  await askNodeList(),
  await askExpressList(),
]);

if (hasExpress) {
  Promise.all([
    await askHttpStatusCodesList(),
    await askExpressAsyncErrorsList(),
    await askRestifyErrorsList(),
    await askJoiList(),
  ]);
}

async function generateCommands() {
  const hasPackageJson = fs.existsSync('./package.json') ? '' : 'npm init -y &&';

  const preInstall = `npm i ${database} dotenv -D typescript @types/node ts-node-dev -D @tsconfig/node${nodeVersion}`;

  const commands = hasExpress
    ? `${hasPackageJson} ${preInstall} && npm i ${hasExpress} ${hasJoi} ${hasHttpStatusCodes} ${hasExpressAsyncErrors} ${hasRestifyErrors}`
    : `${hasPackageJson} ${preInstall}`;

  return commands;
}

async function installDependencies() {
  const spinner = createSpinner(chalk.green('Installing dependencies...')).start();
  await sleep(1000);
  try {
    const commands = await generateCommands();
    const { stdout, _stderr } = await asyncExec(commands);
    spinner.success({ text: chalk.bold.green('Dependencies installed!') });
    return stdout;
  } catch (e) {
    spinner.error({ text: chalk.red(e.message) });
  }
}

await installDependencies();
