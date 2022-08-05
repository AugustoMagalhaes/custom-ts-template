#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';

let nodeVersion;
let database;
let hasExpress;
let hasHttpStatusCodes = '';
let hasExpressAsyncErrors = '';
let hasRestifyErrors = '';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to the Typescript template creator!');
  await sleep();
  console.log(
    chalk.blue('If you want the default installation, just press Enter consecutively... \n'),
  );
  await sleep(3500);
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
    choices: ['10', '12', '14', '16'],
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
    choices: ['Yes', 'No'],
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
    choices: ['Yes', 'No'],
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
    choices: ['Yes', 'No'],
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
    choices: ['Yes', 'No'],
    default() {
      return 'No';
    },
  });

  hasRestifyErrors = answers.restifyErrors === 'Yes' ? 'restify-errors @types/restify-errors' : '';
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
  ]);
}
