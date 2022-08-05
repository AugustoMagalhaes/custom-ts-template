#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from 'chalk-animation';
import fs from 'fs';


let nodeVersion;
let database;

const hasPackageJson = fs.existsSync('./package.json') ? 'npm init -y': '';

const preInstall = `npm install ${database} dotenv -D typescript @types/node ts-node-dev -D @tsconfig/${nodeVersion}`

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Welcome to the Typescript template creator!'
  );
  await sleep();
  console.log(chalk.blue('If you want the default installation, just press Enter consecutively'));
  await sleep(3500);
  rainbowTitle.stop();
}

Promise.all([
await welcome(),
])