#!/usr/bin/env node
'use strict';

import { farewellMessage } from './helpers/farewellMessage.js';
import { mainInstaller } from './src/installer.js';
import askRecommendedOrCustomOptions from './src/tsconfigOptions.js';

// check if file is main module to avoid autorun when importing index.js
if (import.meta.url === `file://${process.argv[1]}`) {
  await mainInstaller();

  await askRecommendedOrCustomOptions();

  await farewellMessage();
}
