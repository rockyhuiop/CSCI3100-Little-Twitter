# CSCI3100 Group F1: LittleTwitter

This repository contains both the backend API (in `backend`) and the frontend
web application of LittleTwitter (in `frontend`).

## Starting

1. Install the dependencies for backend and run the script:

```sh
cd backend
npm install
node server.js
```

2. In a separate terminal, install the dependencies for backend socket part and run:

```sh
cd backend
cd socket
npm install
node index.js
```

3. In a separate terminal, install the dependencies for frontend and run:

```sh
cd frontend
npm install
npm start
```

Note: the backend server must be running for frontend to work.

Alternatively, `start.bat` can be used to run all the server.

## Configuration

We have provided an example `.env` file in backend for convenience. The available variables are:

- `PORT`: which port will the Express server run on.
- `URL`: the connection URL to a Mongo instance. It can be anything including
  local Mongo databases.
- `SESSION`: session secret.
