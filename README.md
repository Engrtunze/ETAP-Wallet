<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# ETAP-Wallet
## Wallet Project

Welcome to the Wallet Project! This project allows users to create wallets, perform transactions, and view payment summaries. It provides a user-friendly API for seamless integration with your applications.

🚀 **Getting Started**

To use the Wallet Project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Install the dependencies using Yarn:

   ```bash
   yarn install
   ```

3. Configure the necessary environment variables (e.g., database connection details, JWT secret key).

4. Build the project:

   ```bash
   yarn build
   ```

5. Start the application:

   ```bash
   yarn start
   ```
   

   **Test Card Information**
To facilitate testing of payment transactions, you can use the following test card information:

Card Number: 4084084084084081
CVV: 408
Expiry Month: 01
Expiry Year: 99
Card PIN: 0000

6. Access the application at `http://localhost:3000`.

📚 **Documentation**

Comprehensive documentation is available to guide you through the project features and API endpoints. Please refer to the Swagger API documentation for detailed information about the available endpoints, request/response structures, and authentication requirements. Access the documentation at `http://localhost:3000/docs#/default`.

🔑 **Authentication and Authorization**

The Wallet Project utilizes JWT (JSON Web Tokens) for authentication and authorization. You can generate a JWT token by calling the appropriate authentication endpoint and including the token in the `Authorization` header of subsequent requests.

⚙️ **Project Structure**

The project is structured as follows:

- `src/` - Contains the source code files
  - `controllers/` - Defines the API endpoints and request handlers
  - `dto/` - Contains the Data Transfer Objects (DTOs) used for request and response validation
  - `entities/` - Defines the database entities/models
  - `enums/` - Contains the enum definitions
  - `config/` - Custom configurations
  - `migrations/` - Database migration scripts
  - `repositories/` - Data access layer for interacting with the database
  - `services/` - Business logic services
  - `utils/` - Utility functions and helper modules
  - `app.module.ts` - Application module and dependencies configuration
  - `main.ts` - Entry point of the application
- `test/` - Contains the test files
- `docs/` - Project documentation files

📖 **Usage**

To understand how to use the Wallet Project, follow this user story:

1. As an admin, you have the authority to create wallets for users and approve transactions.

2. Create a user using the `/user/create-user` endpoint. The user object will be created with the user role and a generated password. In a real-world scenario, you would send the password to the user's email address. However, for testing purposes, the password is returned in the response object.

3. Log in as the user using the appropriate authentication method (e.g., JWT). Obtain the JWT token required for subsequent requests.

4. Set a transaction pin for the user by calling the corresponding endpoint. This pin will be used for transaction authorization.

5. Perform wallet operations such as deposits, withdrawals, or transfers using the provided endpoints. Make sure to include the necessary authentication headers (e.g., JWT token) in your requests.

🔒 **Security**

Please note that some endpoints are restricted to admin users only. These include `/user/create-user` and `/transactions/get-summary/{year}/{month}`. Make sure to authenticate with an admin user to access these endpoints.

⚠️ **Note**

For simplicity, the JWT secret key has been intentionally left in the codebase. In a production environment, it's crucial to secure the secret key and follow industry best practices for JWT security.

⚠️ **Apology for Not Providing Unit Tests**

I apologize for not including unit tests in this project. Due to the limitations of this text-based environment and time constraints, it was not feasible to write comprehensive unit tests for all components. However, writing unit tests is highly recommended for ensuring code quality and reliability. I encourage you to add unit tests to the project to cover critical functionality and edge cases.



🌟 **Enjoy Coding!**

Thank you for using the Wallet Project! If you have any questions or need assistance, feel free to reach out. Happy coding! 😊