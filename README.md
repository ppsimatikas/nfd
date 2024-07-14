# NFD

Welcome to NFDs, Non-Fungible Data!
A Decentralized Big Data Infrastructure.

## Prerequisites

1. Nvm installed on the machine, or Node version v21.1.0 (inside the .nvmrc file)
2. Python 3.12.3

## Local setup

### Install requirements

1. Clone repo 
2. Use correct node version in `.nvmrc` or run `nvm use`
3. Install yarn: `npm install -g yarn`
4. Install libraries: `yarn`
5. Smart contracts
    1. `cd contracts/nfd`
    2. Setup python venv: `python -m venv venv`
    3. Activate venv: `source venv/bin/activate`
    4. Install python requirements: `pip install -r ./requirements.txt`
6. Backend
    1. `cd backend`
    2. Setup python venv: `python -m venv venv`
    3. Activate venv: `source venv/bin/activate`
    4. Install python requirements: `pip install -r ./requirements.txt`
    5. Log in to firebase `npx firebase login`

### Setup environment variables

1. Under `./backend` create a `.env` file
2. Add `LIGHTHOUSE_TOKEN=<token>` create a token here: https://files.lighthouse.storage/dashboard/apikey
3. Add `OPENAI_API_KEY=<token>` create a token here: https://platform.openai.com/settings/profile?tab=api-keys

### Compile and deploy the smart contracts

`yarn build:contracts`
`yarn deploy:contracts:arbitrum`

### Start the Application

`yarn start`

Or you can run the UI and Backend separately:

1. Start a local Tableland instance: `yarn start:tableland`
2. Start the backend: `yarn start:backend`
3. Start the frontend: `yarn start:ui`


### Accessing the application

You access the different parts of the APP:

1. UI: http://localhost:3000/
2. APIs: http://127.0.0.1:5001/demeter-a0451/europe-west1/on_request/
3. Firebase Emulators: http://127.0.0.1:4000/

## Deploy

This project is using CI/CD pipelines to deploy on Firebase cloud.
Every merge on the main branch will automatically deploy the application into firebase.
