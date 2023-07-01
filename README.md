<h1 align="center">Youtube Video Sharing App</h1>

<h3 align="center">
  <a href="https://youtube-video-sharing-app.vercel.app/">Visit the live app</a> |
  <a href="https://shared-video-backend.onrender.com/">BE API</a> |
  <a href="https://github.com/darkluan/youtube-video-sharing-app/tree/main/client">View github client</a> |
  <a href="https://github.com/darkluan/youtube-video-sharing-app/tree/main/server">View github API</a>

</h3>

## 1.Introduction

##### Features

- User registration and login
- Sharing YouTube videos
- Viewing a list of shared
- Real-time notifications for new video shares: When a user shares a new video, other logged-in users should receive a real-time notification about the newly shared video. This notification can be displayed as a pop-up or a banner in the application, and it should contain the video title and the name of the user who shared it

## 2.Prerequisites

- Tool/os: linux wsl on window, visual studio code, tool pgadmin4, postman, docker desktop.

- Tech client app: JS, node 16.x, react 18.x, typescript, vite, eslint, tailwind css, socket.io client cypress test.

- Tech server: JS node 16.x express, JWT,postgresql, ORM sequelize, eslint, socket.io cypress test.

## 3.Installation & Configuration:🛠

- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `shared_video`.
- `git clone https://github.com/darkluan/youtube-video-sharing-app.git`
- Create an empty `.env` file in `/server`, copy `/server/.env.example` contents into it, and fill in your database username and password.
- Create an empty `.env` file in `/client`, copy `/client/.env.example` contents into it.
- `npm run install-dependencies`

## 4.Database Setup:

### 4.1 postgreSQL

- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `shared_video`.

- Install with docker: <a href="https://docs.docker.com/engine/install/">Link docs</a>

- `docker run --name postgresql -e POSTGRES_DB=shared_video -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres:latest`

### 4.2 Migration

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

## 5.Running the Application:

- `cd server && npm start` api check health `http://localhost:3001/health`
- `cd client && npm run dev` in another terminal tab
- App should now be running on `http://localhost:3000`

## 6.Docker Deployment:

- Create an empty `.env` file in `/server`, copy `/server/.env.docker` contents into it.
- Run docker compose `docker-compose up`

## 7.Usage:

- 1. Register account
- 2. Login into app
- 3. User can share video from youtube url
- 4. When you login, you will receive a real-time notification about the newly shared video.
- 5. View list newly video in main page.

## 8.Troubleshooting:
