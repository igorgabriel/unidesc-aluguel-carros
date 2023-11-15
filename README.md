# Aluguel de carros API

API em Nodejs + express + mongodb para a disciplina de Programação Web II do Centro Universitário de Desenvolvimento do Centro-Oeste (UNIDESC) do 2º/2023

## Configuração

Foi utilizado o banco NoSQL **mongodb cloud services** para a criação das collections utilizadas no projeto. Crie a sua conta e um projeto/database em [MongoDB Atlas](https://www.mongodb.com/products/platform/cloud).
 
Crie um arquivo **.env** na raiz do projeto com as seguintes environments:

```
DB_USERNAME=<mongodb_username>
DB_PASSWORD=<mongodb_password>
DB_URL=<mongodb_url>
JWT_SECRET=<jwt_secret>
JWT_OWNER=<jwt_iss>
JWT_EXPIRES=<jwt_expiresIn>
```

## Comandos

Instale as dependências npm com o comando:
```
npm install
```
Inicie (execute) o projeto com o comando:
```
npm start
```
Caso tenha o nodemon instalado, utilize o comando:
```
npm run start:dev
```
> **Observação:** Para instalar o  **nodemon** globalmente utilize o comando: `npm install -g nodemon`

## Estrutura do projeto

O projeto foi dividido em funcionalidades, onde cada funcionalidade possui três arquivos principais: 
- model: Schemas e Models do **mongoose**
- controller: Implementação das funções handler do **roteamento express**
- routes: Implementação das rotas (method e path) do **express**

![enter image description here](https://i.ibb.co/Zf8KHr9/Captura-de-Tela-2023-11-14-a-s-22-12-16.png)
