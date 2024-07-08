# Project Documentation

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Support](#support)
- [Stay in Touch](#stay-in-touch)
- [License](#license)


## Introduction

Welcome to our comprehensive guide on utilizing our application, a robust platform designed to streamline the management of user identities and enhance security through sophisticated authentication and authorization mechanisms. At its core, our application leverages the power of NestJS, a progressive Node.js framework, to build efficient and scalable server-side applications.

Our application is meticulously crafted to offer a wide array of functionalities aimed at simplifying user interactions. Key features include:


* **User Authentication and Authorization:** Through the integration of JWT (JSON Web Tokens) and Google OAuth2, we ensure secure login processes, enabling seamless access control and identity management. Our system is equipped to handle login, logout, and user registration, ensuring each access request is thoroughly authenticated and authorized.  


* **Resource Access Control:** Beyond basic authentication, our application implements a detailed system for controlling access to resources. This is achieved by rigorously managing user permissions, ensuring that only authorized users can access sensitive information or perform certain actions.  


* **User Management:** Our application provides endpoints for user registration and management, allowing for the creation of new users and ensuring that user data is handled securely and efficiently.  


* **Social Login Integration:** With the inclusion of Google OAuth2, our platform supports social login capabilities, offering users a convenient and secure way to access the application without the need for traditional login credentials.  


* **Security and Reliability:** Security is at the forefront of our application. By employing JWT for authentication and leveraging NestJS's built-in security features, we provide a secure environment for managing user identities and access controls. Our application's design and implementation are centered around ensuring reliability and security in managing access to resources.



This guide aims to provide a detailed overview of our application's capabilities, designed to offer a secure, user-friendly environment for identity and access management. Whether you're looking to integrate sophisticated authentication mechanisms or manage user permissions with precision, our application stands ready to meet your needs.


## Prerequisites

- Node.js (version v20.10.0 or above)
- npm (version 10.3.0 or above)

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Configuration

## Configuration

To get started with the application, you need to set up your environment variables correctly. Follow these steps for configuration:

1. **Environment File**: A template environment file named `.env.temp` is provided at the root of the project. You should either rename this file to `.env` or create a new `.env` file by cloning the `.env.temp` file. This file contains key-value pairs that are essential for running the application smoothly.

2. **Setting Variables**: Open your `.env` file and update the following variables according to your environment:
    - `PORT`: Specifies the port number on which the application will run. The default value is `3000`.
    - `DATABASE_URL`: Your database connection URL.
    - `JWT_SECRET`: A secret key used for JWT token encryption.
    - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: These are required for Google OAuth2 integration.

   Example of `.env` content:
   ```plaintext
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/myapp
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. Database Setup: Ensure your database is accessible via the DATABASE_URL provided in your .env file.

4. OAuth2 Configuration: If you're using Google OAuth2, make sure to set up a project in the Google Developer Console to obtain your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.

## Running the Application
To run the application, use the following commands:

```bash
# For development:
npm run start
# For watch mode:
npm run start:dev
# For production mode:
npm run start:prod
```

## Testing

The application comes with a suite of tests to ensure reliability and performance. Use the following commands to run different types of tests:

```bash
# For unit tests:
npm run test
# For end-to-end tests:
npm run test:e2e
# For test coverage:
npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here.](https://docs.nestjs.com/suppor)

## Stay in Touch

 - Author:  [Hazem Safwat](https://www.linkedin.com/in/hazem-safwat/)
 - github: [strikerh](https://github.com/strikerh)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
