# SIWE Integration

This is a simple web application integrating SIWE for managing a user's profile with SIWE.

To do this, the frontend part was developed in **React**, the backend part with **Node.js**, and I used a **PostgreSQL** database for data persistency.

The structure of the project is as follows:

- Frontend
- Backend
- docker-compose


Everything was dockerized to make it easier to run and deploy.
The web app has been deployed on AWS and can be reached at: http://52.51.31.242:3000


# How to run application locally

Locate yourself in the root of the project and run 

    cd frontend && npm install && npm run build && cd ../backend && npm install && npm run build && cd .. && docker-compose up

This will run 3 containers:
- 1 container for the frontend
- 1 container for the backend
- 1 container for the database

To run the project it is necessary to set some environment variables as well, but for simplicity's sake I have included in the repo the .env with all the necessary environment variables

# How to test the depoloyed version
## Desktop

From **desktop** browser simply have **metamask** installed and go to http://52.51.31.242:3000

## Mobile
To test from **mobile** use the **browser** inside the **metamask mobile app**, and enter the url: http://52.51.31.242:3000

# libraries & frameworks

## Backend

- **Express**
- **Node.js**
- **TypeScript**
- **Sequelize**: An ORM (Object-Relational Mapping) for Node.js that supports SQL dialects such as Postgres, MySQL and SQLite.
- **SIWE**: Library for Ethereum-based authentication.

## Frontend
- **React**
- **Typescript**
- **@mui/material**: UI component libraries for React based on Google's Material Design.
- **SIWE**: Library for Ethereum-based authentication.
