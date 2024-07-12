# NFD

Welcome to NFDs, Non-Fungible Data!
A Decentralized Big Data Infrastructure.

## Prerequisites

1. Nvm installed on the machine, or Node version v21.1.0 (inside the .nvmrc file)
2. Python 3.12.3

## Local setup

1. Clone repo
2. Use correct node version in `.nvmrc` or run `nvm use`
3. Install yarn: `npm install -g yarn`
4. Install libraries: `yarn`
5. Start the app: `yarn start`
6. Visit: http://localhost:3000/ for the ui
7. Visit: http://127.0.0.1:4000/ for the firebase emulator suite

Or you can run the UI and Backend separately:

1. Start the backend: `yarn start:backend`, it will start the firebase function emulator
2. Start the frontend: `yarn start:ui`