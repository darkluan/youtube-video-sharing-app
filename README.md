<h1 align="center">Youtube Video Sharing App</h1>

<h3 align="center">
  <a href="https://youtube-video-sharing-app.vercel.app/">Visit the live app</a> |
  <a href="https://github.com/darkluan/youtube-video-sharing-app/tree/main/client">View client</a> |
  <a href="https://github.com/darkluan/youtube-video-sharing-app/tree/main/server">View API</a>
</h3>

## Features

- User registration and login
- Sharing YouTube videos
- Viewing a list of shared
- Real-time notifications for new video shares: When a user shares a new video, other logged-in users should receive a real-time notification about the newly shared video. This notification can be displayed as a pop-up or a banner in the application, and it should contain the video title and the name of the user who shared it

## Setting up development environment 🛠

- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `shared_video`.
- `git clone https://github.com/darkluan/youtube-video-sharing-app.git`
- Create an empty `.env` file in `/server`, copy `/server/.env.example` contents into it, and fill in your database username and password.
- `npm run install-dependencies`
- `cd server && npm start`
- `cd client && npm run dev` in another terminal tab
- App should now be running on `http://localhost:3000/`
