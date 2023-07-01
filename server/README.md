## Source Code Structure

```
# NodeJs Project Structure
.
|-- app/
|   |-- config/
|   |   |-- index.js
|   |-- feature/
|   |   |-- register/
|   |   |   |-- register.controller.js
|   |   |   |-- register.route.js
|   |   |   |-- register.spec.js
|   |   |   |-- register.request-schema.js
|   |   |   |-- register.response-schema.js
|   |   |-- index.js
|   |-- lib/
|   |   |-- logger/
|   |-- middleware/
|   |   |-- validator.middleware.js
|   |-- model/
|   |   |-- user.js
|-- scripts
|  |-- preinstall.js                    # Run before npm install
|  |-- postinstall.js                   # Run after npm install
|-- package.json
|-- package-lock.json
|-- index.js
|-- server.js
|-- pm2.js
|-- env.example                        # Default config for all env
|-- README.md
|-- .eslintrc.js
|-- .gitignore
```

# Starting Project

### Create config file

Create `.env` file. Copy content from `.evn.example` into `.env`. Change config in `.env` corresponding to your environment

### Install package

```
npm instal
```

### Run

```
node index.js
```

- Default server will be started at http://localhost:3001

### install postgres local with docker

- install docker: <a href="https://docs.docker.com/engine/install/">Link docs</a>

- docker run --name postgresql -e POSTGRES_DB=shared_video -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres:latest

### Testing

```
node run test
```

### Migration

- In `./server` When you want to change DB then you have to create migration file.

- Migration config: All configs related to migration in `.sequelizerc`

- Create Migration: In order to create migration then you run command below

```
sequelize migration:create --name name-of-migration || npx sequelize-cli migration:create --name name-of-migration
```

- New file migration will be in `app/model/migration`

- The format of migration file

```javascript
"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
```

- More commands please look at https://sequelize.readthedocs.io/en/latest/docs/migrations/#the-cli
  jV3z2Hd8Vf8DixXu

# Deployment

## Configuration

For each environment we have a file config.

- Develop: `ecosystem.dev.config.js`
- Staging: `ecosystem.stg.config.js`
- Production: `ecosystem.pro.config.js`

Please change these files with your Configuration.

## Deploy with docker

Please run script below.

```
    - docker rm -f <DOCKER_CONTAINER_NAME>
    - docker rmi -f <DOCKER_IMAGE_NAME>
    - docker build -t <DOCKER_IMAGE_NAME>.
    - docker run -d --name <DOCKER_CONTAINER_NAME> -p 8090:3001 -e env=<ENV> <DOCKER_IMAGE_NAME>
```

- Change **DOCKER_CONTAINER_NAME**, **DOCKER_IMAGE_NAME** to the name you want.
- With **ENV**: `dev`, `stg`, `pro`

## Deploy with pm2

- Install pm2

```
npm i pm2 -g
```

- Start server

```
  pm2 start ecosystem.<ENV>.config.js
```
