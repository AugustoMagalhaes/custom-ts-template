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

* [ ] Adds possibility to generate the template in a customized directory.

#### Techs used

The project have been made in Javascript, and used the following libs:

- chalk: used to customize terminal colors
- chalk-animation: used to generate terminal colored animations.
- figlet: used for ASCII art creation.
- gradient-string: used for gradient colors creation in terminal.
- inquirer: biblioteca utilizada para interface de CLI que permite capta????o simplificada de inputs
- inquirer: used for CLI interface that allows simplified input capture.
- nanospinner: used to create 'spinners' that decorates the terminal.

## ???? Installation guidelines

1. With 'npx':
   type the command:

```npm
npx custom-ts-template
```

The executable will install the necessary dependencies and automatically launch the Typescript template generation CLI.

**IMPORTANT**: You need to enter the directory where you want to create the project and then run the command.

or

2. Type the command:

```npm
npm install custom-ts-template
```

The installer will generate a 'clone' of the project with an index.js file that can be run with `npm start`. As the central idea of ??????the project is to create files in the root folder in which it is running, this method is not recommended as it will overwrite possible files already initialized by the installation, such as .gitignore, package.json, package-lock.json, etc.

[??? Back to the top](#nome-do-projeto)<br>

<h1 id="nome-do-projeto">Typescript template creator </h1>

## Portugu??s:

> Reposit??rio do `npx custom-ts-template` que permite ao usu??rio executar uma aplica????o simples de CLI para customizar instala????o de depend??ncias <i>e</i> cria????o/configura????o do tsconfig.json em projetos Typescript com ou sem express.

### :computer: Sobre o projeto

#### Geral

O projeto ainda est?? em desenvolvimento e possui as seguintes funcionalidades:

- [x] Instala????o customizada das seguintes bibliotecas:

1. 'dependencies':

- dotenv (padr??o)
- driver de banco de dados (mysql OU mongodb OU postgres)
- express

  > Caso o express for instalado, as seguintes op????es ser??o permitidas:

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

- @tsconfig/node{_vers??oEscolhidaDoNode_} (padr??o)

- @types/node (padr??o)
- ts-node-dev (padr??o)
- typescript (padr??o)
- nodemon

  > Caso o express for instalado, as seguintes op????es ser??o permitidas:

- @types/express (padr??o com a instala????o do express)
- @types/restify-errors -> (padr??o com a instala????o do restify-errors)
- joi
- morgan

* [x] Gera????o de um tsconfig.json a partir de duas op????es:

- Recommended: gera um tsconfig.json adequado para a vers??o do node escolhida anteriormente de acordo com as recomenda????es de 'bases' do Typescript.
- Custom: permite a customiza????o das flags de 'compilerOptions': target, module, allowJs, strict, esModuleInterop, skipLibCheck, forceConsistentCasingInFileNames, preserveConstEnums, rootDir e outDir. Tamb??m permite a customiza????o dos campos 'include' e 'exclude' do tsconfig.json.

* [x] Gera um .gitignore de acordo com as recomenda????es da Toptal.

* [ ] Adiciona possibilidade de gerar o template em um diret??rio customizado.

#### Tecnologias utilizadas

O projeto foi feito em Javascript, utilizando as seguintes bibliotecas:

- chalk: utilizada parar customizar cores do terminal
- chalk-animation: usada para criar anima????es com o objetivo de customizar estilos de terminal
- figlet: utilizada para cria????o de arte ASCII
- gradient-string: utilizada para criar gradiente de cores em output de terminal
- inquirer: biblioteca utilizada para interface de CLI que permite capta????o simplificada de inputs
- nanospinner: utilizada para cria????o de 'spinners' para enfeitar o terminal

## ???? Orienta????es de Instala????o

1. Executando com 'npx':
   Digite o comando:

```npm
npx custom-ts-template
```

O execut??vel ir?? instalar as depend??ncias necess??rias e automaticamente iniciar o CLI de gera????o de templates Typescript.

**IMPORTANTE**: Voc?? precisa entrar no diret??rio que deseja criar o projeto e depois rodar o comando.

ou

2. Digite o comando:

```npm
npm install custom-ts-template
```

O instalador ir?? gerar um 'clone' do projeto com um arquivo index.js que pode ser executado com `npm start`. Como a ideia central do projeto ?? criar arquivos na pasta raiz na qual est?? sendo executado, este m??todo n??o ?? recomendado pois ir?? sobrescrever poss??veis arquivos j?? inicializados pela instala????o, como o .gitignore, package.json, package-lock.json, etc.

[??? Voltar ao topo](#nome-do-projeto)<br>
