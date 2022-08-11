const customTsconfig = new Map([
  ['--target', ['ES2015', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext']],
  ['--module', ['commonjs', 'es6', 'es2020', 'es2021', 'esnext', 'node16', 'nodenext']],
  ['--allowJs', ['true', 'false']],
  ['--strict', ['true', 'false']],
  ['--esModuleInterop', ['true', 'false']],
  ['--skipLibCheck', ['true', 'false']],
  ['--forceConsistentCasingInFileNames', ['true', 'false']],
  ['--preserveConstEnums', ['true', 'false']],
]);

const tsconfigDocUrl = 'https://www.typescriptlang.org/tsconfig';

const tsconfigInfo = new Map([
  ['--target', `(${tsconfigDocUrl}#target)`],
  ['--module', `(${tsconfigDocUrl}#module)`],
  ['--allowJs', `(${tsconfigDocUrl}#allowJs)`],
  ['--strict', `(${tsconfigDocUrl}#strict)`],
  ['--esModuleInterop', `(${tsconfigDocUrl}#esModuleInterop)`],
  ['--skipLibCheck', `(${tsconfigDocUrl}#skipDefaultLibCheck`],
  ['--forceConsistentCasingInFileNames', `(${tsconfigDocUrl}#forceConsistentCasingInFileNames)`],
  ['--preserveConstEnums', `(${tsconfigDocUrl}#preserveConstEnums)`],
]);
