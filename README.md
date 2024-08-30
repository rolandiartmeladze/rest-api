
# NestJS REST API Project

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

## Description

This project is a REST API built using the [NestJS](https://nestjs.com/) framework with TypeScript. The application fetches user data from an external API, stores it in a MongoDB database hosted on MongoDB Atlas, and provides endpoints to retrieve, add, update, and delete users.

## Table of Contents
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/rolandiartmeladze/rest-api.git
cd rest-api
npm install
```

## Project Setup

Before running the application, you need to configure your environment variables. Create a `.env` file in the project root and add the following variables:

```env
MONGO_URI=<Your MongoDB Atlas Connection URI>
API_URL=https://reqres.in/api/users
```

Make sure to replace `<Your MongoDB Atlas Connection URI>` with your actual MongoDB Atlas connection string.

## Running the Application

You can run the application in different modes:

```bash
# Development mode
npm run start

# Watch mode (auto-restart on changes)
npm run start:dev

# Production mode
npm run start:prod
```

## API Endpoints

- **GET /api/users**: Fetches users from the external API and stores them in the database.
- **GET /api/users/:id**: Retrieves a specific user from the database by ID.
- **POST /api/users**: Adds a new user to the database.
- **PUT /api/users/:id**: Updates a user in the database.
- **DELETE /api/users/:id**: Deletes a user from the database.

## Running Tests

To ensure the application functions as expected, you can run the following test commands:

```bash
# Unit tests
npm run test

# End-to-End (e2e) tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Technologies Used

- **NestJS**: Framework for building efficient and scalable server-side applications.
- **TypeScript**: Typed JavaScript for better code quality and maintainability.
- **MongoDB Atlas**: Cloud-based MongoDB service.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Axios**: Promise-based HTTP client for making requests.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
