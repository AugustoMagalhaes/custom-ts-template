<h1 id="nome-do-projeto">Typescript template creator </h1>

![GitHub repo size](https://img.shields.io/github/repo-size/AugustoMagalhaes/create-ts-template?color=%234ec66e&label=GitHub%20Repo%20Size)
![GitHub language count](https://img.shields.io/github/languages/count/AugustoMagalhaes/create-ts-template?color=%234ec66e)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AugustoMagalhaes/create-ts-template?color=%234e8ac6)

> Repositório do `npx create-ts-template` que permite ao usuário executar uma aplicação simples de CLI para customizar instalação de dependências <i>e</i> criação/configuração do tsconfig.json em projetos Typescript com ou sem express.

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
npx create-ts-template
```

O executável irá instalar as dependências necessárias e automaticamente iniciar o CLI de geração de templates Typescript.

ou

2. Digite o comando:

```npm
npm install create-ts-template
```

O instalador irá gerar um 'clone' do projeto com um arquivo index.js que pode ser executado com `npm start`. Como a ideia central do projeto é criar arquivos na pasta raiz na qual está sendo executado, este método não é recomendado pois irá sobrescrever possíveis arquivos já inicializados pela instalação, como o .gitignore, package.json, package-lock.json, etc.

[⬆ Voltar ao topo](#nome-do-projeto)<br>
