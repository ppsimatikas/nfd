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
5. `cd backend`
6. Setup python venv: `python -m venv venv"`
7. Activate venv: `source venv/bin/activate`
8. Install python requirements: `pip install -r ./requirements.txt`
9. Start the app: `yarn start`

You access the different parts of the APP:

1. UI: http://localhost:3000/
2. APIs: http://127.0.0.1:5001/demeter-a0451/europe-west1/on_request/
3. Firebase Emulators: http://127.0.0.1:4000/

Or you can run the UI and Backend separately:

1. Start the backend: `yarn start:backend`, it will start the firebase function emulator
2. Start the frontend: `yarn start:ui`

## Deploy

This project is using CI/CD pipelines to deploy on Firebase cloud.
Every merge on the main branch will automatically deploy the application into firebase.
