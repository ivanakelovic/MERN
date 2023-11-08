# Tender Platform

## Quick Start

To install this project follow the steps bellow:

1. Clone this project.
2. Go to `admin` folder
3. Run `yarn install`
4. Go to `backend` folder
5. Run `cp .env.example .env` to create .env file
6. Run `yarn install` to install the dependencies
7. Run `yarn docker:dev` to run the API in dev mode


## Running the Project

1. Run `yarn start` from `admin` folder
2. Run `yarn docker:dev` from `backend` folder


## API Structure

```
backend/src
    config/         # Environment variables and configuration related things
    controllers/    # Route controllers (controller layer)
    docs/           # Swagger files
    middlewares/    # Custom express middlewares
    models/         # Mongoose models (data layer)
    routes/         # Routes
    services/       # Business logic (service layer)
    utils/          # Utility classes and functions
    validations/    # Request data validation schemas
    app.js          # Express app
    index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.
