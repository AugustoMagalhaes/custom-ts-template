'use strict';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import { exec } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import util from 'util';

export const asyncExec = util.promisify(exec);

let nodeVersion = '';

let prodDependencies = new Set(['dotenv']);
let devDependencies = new Set(['typescript', '@types/node', 'ts-node-dev']);

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  console.clear();

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

async function askDatabaseDriver() {
  const answer = await inquirer.prompt({
    name: 'dbDriver',
    type: 'list',
    message: `Which ${chalk.bold.green(
      'database',
    )} driver would you like to use with your Typescript project? \n Drivers: \n`,
    choices: ['mysql2', 'mongodb', 'postgres'],
    default() {
      return 'mysql2';
    },
  });

  prodDependencies.add(answer.dbDriver);
}

async function askNodeVersion() {
  const answer = await inquirer.prompt({
    name: 'node',
    type: 'list',
    message: `Which version of ${chalk.bold.green(
      'Node',
    )} would you like to use with your Typescript project? \n Versions: \n`,
    choices: ['16', '14', '12', '10'],
    default() {
      return '16';
    },
  });

  nodeVersion = answer.node;
}

function checkExpress() {
  return prodDependencies.has('express') ? 'express ' : '';
}

let messages = {
  mostFrequent: `Would you like to include the ${chalk.bold.green(
    '*',
  )} library to your <>project?: \n`,
};

async function askYesOrNoOptions(lib, isDev = false, command = lib) {
  const answer = await inquirer.prompt({
    name: lib,
    type: 'list',
    message: messages.mostFrequent.replace('*', lib).replace('<>', checkExpress),
    choices: ['No', 'Yes'],
    default() {
      return 'No';
    },
  });

  const checkAnswer = answer[lib] === 'Yes' ? command : '';
  if (isDev) {
    devDependencies.add(command);
    return;
  }

  // Condition for when command has multiple assignments -> e.g. 'express @types/express'
  const [prodEnv, devEnv] = checkAnswer.split(' ');
  prodEnv && prodDependencies.add(prodEnv);
  devEnv && devDependencies.add(devEnv);
}

function joinSetElements(set) {
  const arrayFromSet = [...set];
  const joinedElements = arrayFromSet.join(' ');

  return joinedElements;
}

function generateCommands() {
  const hasPackageJson = fs.existsSync('./package.json') ? '' : 'npm init -y';

  const [prodSetup, devSetup] = [
    joinSetElements(prodDependencies),
    joinSetElements(devDependencies),
  ];

  const prodCommands = `npm i ${prodSetup}`;
  const devCommands = `npm i -D ${devSetup} @tsconfig/node${nodeVersion}`;

  return hasPackageJson
    ? `${hasPackageJson} && ${prodCommands} && ${devCommands}`
    : `${prodCommands} && ${devCommands}`;
}

async function installDependencies() {
  const spinner = createSpinner(chalk.green('Installing dependencies...')).start();

  try {
    const commands = generateCommands();
    const { stdout, _stderr } = await asyncExec(commands);

    console.log(`\n ${stdout}`);

    spinner.success({ text: chalk.bold.green('Dependencies installed!') });

    return stdout;
  } catch (e) {
    spinner.error({ text: chalk.red(e.message) });
  }
}

export async function mainInstaller() {
  Promise.all([
    await welcome(),
    await askDatabaseDriver(),
    await askNodeVersion(),
    await askYesOrNoOptions('nodemon', true),
    await askYesOrNoOptions('express', false, 'express @types/express'),
  ]);

  if (prodDependencies.has('express')) {
    Promise.all([
      await askYesOrNoOptions('http-status-codes'),
      await askYesOrNoOptions('express-async-errors'),
      await askYesOrNoOptions('restify-errors', false, 'restify-errors @types/restify-errors'),
      await askYesOrNoOptions('joi', true),
      await askYesOrNoOptions('body-parser'),
      await askYesOrNoOptions('cors'),
      await askYesOrNoOptions('helmet'),
      await askYesOrNoOptions('morgan', true),
      await askYesOrNoOptions('jsonwebtoken'),
      await askYesOrNoOptions('cookie-parser'),
      await askYesOrNoOptions('passport'),
    ]);
  }

  await installDependencies();
}

export function getNodeVersion() {
  return nodeVersion;
}
