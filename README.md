# Projeto Blogs-API v1.0.0

Esse projeto acadêmico é uma API e um banco de dados para a produção de conteúdo para um blog!.

#### Ferramentas

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JSON Web Token](https://jwt.io/)
- [Heroku](https://dashboard.heroku.com/)
- [Swagger](https://swagger.io/)
- [ESLint](https://eslint.org/)
- [Git](https://git-scm.com/)

#### Documentação da API com Swagger

A documentação da API em desenvolvimento do Projeto Blogs-API está publicado no [Heroku](https://project-blogs-back.herokuapp.com/api-docs/).

---

Para configurar o ambiente de desenvolvimento de forma apropriada, siga as instruções abaixo:

#### Pré requisitos

- npm (8.x)
- Node.js (16.x)
- mySQL

#### Clonando o projeto com o Git

Para clonar o projeto via linha de comando, abra o terminal no seu computador e execute os comandos:

```shell
git clone git@github.com:Israeljs/project-blogs-back.git
cd project-blogs-back
```

Execute os comandos abaixo na raiz do projeto para instalar essas dependências globalmente e em seguida as dependências do projeto.

```shell
npm install -g sequelize-cli eslint
npm install
```

#### Conectando o servidor ao banco de dados mySQL

Os dados de conexão com o banco de dados devem ser definidas através de variáveis de ambiente. A maneira mais simples de fazer isso é criar o arquivo `.env` na raiz do projeto e incluir as variáveis como no exemplo abaixo:

```shell
NODE_ENV=development
PORT=
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
```

Agora precisamos executar o comando a seguir para que o Sequelize crie toda a estrutura do banco de dados da aplicação:

```shell
sequelize-cli db:migrate
```

#### Segurança

As requsições à API devem conter no header um token como no exemplo abaixo:

```shell
Authorization: Bearer {token}
```

#### Executando o projeto

Depois de todas as configurações acima, execute o comando abaixo para subir o servidor no ambiente de desenvolvimento. Certifique-se de que o seu banco de dados esteja funcionando e acessível.

```shell
npm run dev
```

E em seguida, acesse a API em [localhost:3000](http://localhost:3000/) no seu navegador.

A porta padrão é a 3000, mas é possível escolher outra porta através da variável de ambiente `PORT` no arquivo `.env`.

#### Plugins do VSCode

O plugin do ESLint devem ser instalados no Virtual Studio Code:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

