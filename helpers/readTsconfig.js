import chalk from 'chalk';
import fs from 'fs/promises';

function stripComments(data) {
  return data.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => (g ? '' : m));
  // thanks https://stackoverflow.com/questions/33483667/how-to-strip-json-comments-in-javascript
}

export async function customRead(path) {
  const data = await fs.readFile(path, { encoding: 'utf8' });
  return data;
}
export default async function readAndParse() {
  try {
    let data = await read('./tsconfig.json');
    const commentlessData = stripComments(data);

    const parsedData = JSON.parse(commentlessData);

    return parsedData;
  } catch (err) {
    console.error(chalk.red(err.message));
  }
}
