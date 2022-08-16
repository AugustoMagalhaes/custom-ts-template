#!/usr/bin/env node
'use strict';

import { farewellMessage } from './helpers/farewellMessage.js';
import gitignoreContent from './helpers/fileContents/gitignoreContent.js';
import writeAuxFiles from './helpers/writeAuxiliaryFiles.js';
import { mainInstaller } from './src/installer.js';
import askRecommendedOrCustomOptions from './src/tsconfigOptions.js';

export default async function main() {
  await mainInstaller();

  await askRecommendedOrCustomOptions();

  await writeAuxFiles(gitignoreContent, './.gitignore', '.gitignore');

  await farewellMessage();
}

// check if file is main module to avoid autorun when importing index.js
if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
