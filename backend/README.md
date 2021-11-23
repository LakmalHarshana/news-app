# Hapi-api

## Steps to run the api locally

**Connect to MYSQL server**
In the project directory, you can run:

### `npx sequelize-cli db:create`

### `npx sequelize-cli db:migrate`

### `npx sequelize-cli db:seed:all`

### `npm start`

Runs the api in the development mode.\
Open [http://localhost:3000/docs#/](http://localhost:3000/docs#/) to view the api docs in the browser.

## Sequalize CLI

Use cli with npx eg. npx sequelize-cli model:generate
Refer https://sequelize.org/master/manual/migrations.html
Sequalize cli - ./node_modules/.bin/sequelize-cli

### Access models from outside request

const {ModelName} = (await require('../../server').deployment()).plugins['hapi-sequelizejs'][process.env.db_name].models

Remove pal remote when ready to go to prod (git remote -v)
