<h1 id="nome-do-projeto">Typescript custom template creator </h1>

## English

![GitHub repo size](https://img.shields.io/github/repo-size/AugustoMagalhaes/custom-ts-template?color=%234ec66e&label=GitHub%20Repo%20Size)
![GitHub language count](https://img.shields.io/github/languages/count/AugustoMagalhaes/custom-ts-template?color=%234ec66e)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AugustoMagalhaes/custom-ts-template?color=%234e8ac6)

> `npx custom-ts-template`'s repository, which allows user to execute a simple CLI application to customize dependencies installation <i>and</i> generation/settings of tsconfig.json in Typescript projects with or without express.

### :computer: About the project

#### General

The project is still in-progress and has the following functionalities:

- [x] Custom installation of following libs:

1. 'dependencies':

- dotenv (standard)
- database driver (mysql OR mongodb OR postgres)
- express

> If express is installed, the following options are allowed:

- http-status-codes
- express-async-errors
- restify-errors
- body-parser
- cors
- helmet
- jsonwebtoken
- cookie-parser
- passport

2. 'devDependencies':

- @tsconfig/node{_chosenNodeVersion_} (standard)

- @types/node (standard)
- ts-node-dev (standard)
- typescript (standard)
- nodemon

> If express is installed, the following options are allowed:

- @types/express (standard if express is installed)
- @types/restify-errors -> (standard if restify-errors is installed)
- joi
- morgan

* [x] Generation of a tsconfig.json with two possible options:

- Recommended: generates a tsconfig.json with Typescript's standard config for the chosen node version. Also allows customization of rootDir and outDir of 'compilerOptions' and the 'include' and 'exclude' fields of tsconfig.json.

- Custom: allows customization of 'compilerOptions' flags: target, module, allowJs, strict, esModuleInterop, skipLibCheck, forceConsistentCasingInFileNames, preserveConstEnums, rootDir e outDir. Also allows customization of 'include' and 'exclude' fields of tsconfig.json.

* [x] Generates a .gitignore based on Toptal's.

#### Techs used

The project have been made in Javascript, and used the following libs:

- chalk: used to customize terminal colors
- chalk-animation: used to generate terminal colored animations.
- figlet: used for ASCII art creation.
- gradient-string: used for gradient colors creation in terminal.
- inquirer: biblioteca utilizada para interface de CLI que permite captação simplificada de inputs
- inquirer: used for CLI interface that allows simplified input capture.
- nanospinner: used to create 'spinners' that decorates the terminal.

## 🚀 Installation guidelines

1. With 'npx':
   type the command:

```npm
npx custom-ts-template
```

The executable will install the necessary dependencies and automatically launch the Typescript template generation CLI.

or

2. Type the command:

```npm
npm install custom-ts-template
```

The installer will generate a 'clone' of the project with an index.js file that can be run with `npm start`. As the central idea of ​​the project is to create files in the root folder in which it is running, this method is not recommended as it will overwrite possible files already initialized by the installation, such as .gitignore, package.json, package-lock.json, etc.

[⬆ Back to the top](#nome-do-projeto)<br>

<h1 id="nome-do-projeto">Typescript template creator </h1>

## Português:

> Repositório do `npx custom-ts-template` que permite ao usuário executar uma aplicação simples de CLI para customizar instalação de dependências <i>e</i> criação/configuração do tsconfig.json em projetos Typescript com ou sem express.

### :computer: Sobre o projeto

#### Geral

O projeto ainda está em desenvolvimento e possui as seguintes funcionalidades:

- [x] Instalação customizada das seguintes bibliotecas:

1. 'dependencies':

- dotenv (padrão)
- driver de banco de dados (mysql OU mongodb OU postgres)
- express

  > Caso o express for instalado, as seguintes opções serão permitidas:

- http-status-codes
- express-async-errors
- restify-errors
- body-parser
- cors
- helmet
- jsonwebtoken
- cookie-parser
- passport

2. 'devDependencies':

- @tsconfig/node{_versãoEscolhidaDoNode_} (padrão)

- @types/node (padrão)
- ts-node-dev (padrão)
- typescript (padrão)
- nodemon

  > Caso o express for instalado, as seguintes opções serão permitidas:

- @types/express (padrão com a instalação do express)
- @types/restify-errors -> (padrão com a instalação do restify-errors)
- joi
- morgan

* [x] Geração de um tsconfig.json a partir de duas opções:

- Recommended: gera um tsconfig.json adequado para a versão do node escolhida anteriormente de acordo com as recomendações de 'bases' do Typescript.
- Custom: permite a customização das flags de 'compilerOptions': target, module, allowJs, strict, esModuleInterop, skipLibCheck, forceConsistentCasingInFileNames, preserveConstEnums, rootDir e outDir. Também permite a customização dos campos 'include' e 'exclude' do tsconfig.json.

* [x] Gera um .gitignore de acordo com as recomendações da Toptal.

#### Tecnologias utilizadas

O projeto foi feito em Javascript, utilizando as seguintes bibliotecas:

- chalk: utilizada parar customizar cores do terminal
- chalk-animation: usada para criar animações com o objetivo de customizar estilos de terminal
- figlet: utilizada para criação de arte ASCII
- gradient-string: utilizada para criar gradiente de cores em output de terminal
- inquirer: biblioteca utilizada para interface de CLI que permite captação simplificada de inputs
- nanospinner: utilizada para criação de 'spinners' para enfeitar o terminal

## 🚀 Orientações de Instalação

1. Executando com 'npx':
   Digite o comando:

```npm
npx custom-ts-template
```

O executável irá instalar as dependências necessárias e automaticamente iniciar o CLI de geração de templates Typescript.

ou

2. Digite o comando:

```npm
npm install custom-ts-template
```

O instalador irá gerar um 'clone' do projeto com um arquivo index.js que pode ser executado com `npm start`. Como a ideia central do projeto é criar arquivos na pasta raiz na qual está sendo executado, este método não é recomendado pois irá sobrescrever possíveis arquivos já inicializados pela instalação, como o .gitignore, package.json, package-lock.json, etc.

[⬆ Voltar ao topo](#nome-do-projeto)<br>
