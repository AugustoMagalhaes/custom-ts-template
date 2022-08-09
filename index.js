#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import { exec } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import util from 'util';

const asyncExec = util.promisify(exec);

let nodeVersion = '';

let prod = {
  database: '',
  hasExpress: '',
  dotenv: 'dotenv',
  hasHttpStatusCodes: '',
  hasExpressAsyncErrors: '',
  hasRestifyErrors: '',
  hasHelmet: '',
  hasJWT: '',
  hasBodyParser: '',
  hasCors: '',
};

let dev = {
  hasExpress: '',
  hasRestifyErrors: '',
  hasJoi: '',
  hasNodemon: '',
  typescript: 'typescript',
  typeNodes: '@types/node',
  tsNodeDev: 'ts-node-dev',
  hasMorgan: '',
};

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to the Typescript template creator! \n');
  await sleep();
  console.log(
    chalk.yellow(
      `*** ${chalk.underline.green(
        'If you want the default installation, just press Enter consecutively...',
      )} ***\n`,
    ),
  );
  await sleep(2500);
  rainbowTitle.stop();
}

async function askDatabaseList() {
  const answers = await inquirer.prompt({
    name: 'Database',
    type: 'list',
    message: `Which ${chalk.bold.green(
      'database',
    )} driver would you like to use with your Typescript project? \n Drivers: \n`,
    choices: ['mysql2', 'mongodb', 'postgres'],
    default() {
      return 'mysql2';
    },
  });

  prod['database'] = answers.Database;
}

async function askNodeList() {
  const answers = await inquirer.prompt({
    name: 'Node',
    type: 'list',
    message: `Which version of ${chalk.bold.green(
      'Node',
    )} would you like to use with your Typescript project? \n Versions: \n`,
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
    message: `Will your project use ${chalk.bold.green('Express')} for backend development?: \n`,
    choices: ['No', 'Yes'],
    default() {
      return 'No';
    },
  });

  const checkAnswer = answers.Express === 'Yes';

  [prod['hasExpress'], dev['hasExpress']] = checkAnswer ? ['express', '@types/express'] : ['', ''];
}

function checkComplementaryLib(variable, checkAnswer) {
  const checkLib = Object.keys(dev).includes(variable);
  if (checkLib) {
    dev[variable] = checkAnswer.split(' ')[1] || '';
  }
}

async function askYesOrNoList(lib, variable, command) {
  const answers = await inquirer.prompt({
    name: lib,
    type: 'list',
    message: `Would you like to include the ${chalk.bold.green(
      lib,
    )} library to your express project?: \n`,
    choices: ['No', 'Yes'],
    default() {
      return 'No';
    },
  });

  const checkAnswer = answers[lib] === 'Yes' ? command : '';

  if (Object.keys(prod).includes(variable)) {
    prod[variable] = checkAnswer.split(' ')[0];
    checkComplementaryLib(variable, checkAnswer);
  } else {
    dev[variable] = checkAnswer;
  }
}

Promise.all([
  await welcome(),
  await askDatabaseList(),
  await askNodeList(),
  await askExpressList(),
  await askYesOrNoList('nodemon', 'hasNodemon', 'nodemon'),
]);

if (prod.hasExpress) {
  Promise.all([
    await askYesOrNoList('http-status-codes', 'hasHttpStatusCodes', 'http-status-codes'),
    await askYesOrNoList('express-async-errors', 'hasExpressAsyncErrors', 'express-async-errors'),
    await askYesOrNoList(
      'restify-errors',
      'hasRestifyErrors',
      'restify-errors @types/restify-errors',
    ),
    await askYesOrNoList('joi', 'hasJoi', 'joi'),
    await askYesOrNoList('body-parser', 'hasBodyParser', 'body-parser'),
    await askYesOrNoList('cors', 'hasCors', 'cors'),
    await askYesOrNoList('helmet', 'hasHelmet', 'helmet'),
    await askYesOrNoList('morgan', 'hasMorgan', 'morgan'),
    await askYesOrNoList('jsonwebtoken', 'hasJWT', 'jsonwebtoken'),
  ]);
}

async function commandReducer(obj) {
  const objValues = Object.values(obj);

  const allCommands = await objValues.reduce((acc, curr) => {
    if (curr) {
      acc = acc.concat(' ').concat(curr);
    }
    return acc;
  }, '');

  return allCommands;
}

async function generateCommands() {
  const hasPackageJson = fs.existsSync('./package.json') ? '' : 'npm init -y &&';

  const [prodSetup, devSetup] = await Promise.all([commandReducer(prod), commandReducer(dev)]);

  const prodCommands = `npm i ${prodSetup}`;
  const devCommands = `npm i -D ${devSetup} @tsconfig/node${nodeVersion}`;

  return hasPackageJson
    ? `${hasPackageJson} && ${prodCommands} && ${devCommands}`
    : `${prodCommands} && ${devCommands}`;
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
