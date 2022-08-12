const node10 = {
  $schema: 'https://json.schemastore.org/tsconfig',
  display: 'Node 10',
  compilerOptions: {
    lib: ['es2018'],
    module: 'commonjs',
    target: 'es2018',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    moduleResolution: 'node',
  },
};

const node12 = {
  $schema: 'https://json.schemastore.org/tsconfig',
  display: 'Node 12',
  compilerOptions: {
    lib: ['es2019', 'es2020.promise', 'es2020.bigint', 'es2020.string'],
    module: 'commonjs',
    target: 'es2019',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    moduleResolution: 'node',
  },
};

const node14 = {
  $schema: 'https://json.schemastore.org/tsconfig',
  display: 'Node 14',
  compilerOptions: {
    lib: ['es2020'],
    module: 'commonjs',
    target: 'es2020',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    moduleResolution: 'node',
  },
};

const node16 = {
  $schema: 'https://json.schemastore.org/tsconfig',
  display: 'Node 16',

  compilerOptions: {
    lib: ['es2021'],
    module: 'commonjs',
    target: 'es2021',

    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    moduleResolution: 'node',
  },
};

const allStandardOptions = {
  node10,
  node12,
  node14,
  node16,
};

export default allStandardOptions;
