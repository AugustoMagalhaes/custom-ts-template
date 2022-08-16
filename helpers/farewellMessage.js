import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import sleep from './sleep.js';

export async function farewellMessage() {
  await sleep();
  const msg = 'Happy Coding!';
  const figletConfig = figlet.textSync(msg, {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'fitted',
    width: 120,
  });
  console.log(gradient.pastel('-'.repeat(process.stdout.columns)));
  console.log(gradient.pastel(figletConfig));
  console.log(gradient.pastel('-'.repeat(process.stdout.columns)), '\n');
  console.log(
    chalk.bold.green(
      'This script was made by AugustoMagalhaes (https://github.com/AugustoMagalhaes/custom-ts-template)',
    ),
  );
  console.log(chalk.bold.white.bgGreen('Any suggestions and comments are appreciated :) \n'));
}
