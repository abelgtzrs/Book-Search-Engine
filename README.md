# Book Search Engine (GraphQL Refactor)

## Description

This is a full-stack MERN application that allows users to search for books using the Google Books API, create an account, log in, and save books to their personal reading list. Originally implemented using RESTful APIs, the application has been fully refactored to use Apollo Server with GraphQL, JWT-based authentication, and MongoDB Atlas for persistent storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Deployed Link](#deployed-link)
- [Screenshot](#screenshot)
- [License](#license)
- [Contributors and Questions](#contributors-and-questions)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-search-graphql.git
   ```

2. Navigate into the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in the `/server` folder and include the following:
   ```env
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET_KEY=your-secret-key
   ```

4. Build the server:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. In a new terminal, navigate into the `client` directory:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## Usage

- Visit the client application at `http://localhost:3000`
- Search for books using the search bar
- Sign up or log in to save books to your account
- View and delete saved books from the "Saved Books" section

## Features

- Apollo Server with GraphQL queries and mutations
- Fully integrated JWT authentication system
- Google Books API search integration
- Save and delete user-specific book entries
- Responsive React interface using Bootstrap
- MongoDB Atlas for cloud-based data persistence

## Deployed Link

[Click here to visit the deployed site on Netlify](https://chic-lily-014d82.netlify.app/)

## Screenshot

![Search page](https://github.com/user-attachments/assets/2eba1a4a-d986-492b-a4d2-3d1b4566fd43)
![Saved Books page](https://github.com/user-attachments/assets/92f96ba3-137e-43a1-8154-61b62f386ad8)

## License

This project is licensed under the MIT License.

## Contributors and Questions

Built by Abel Gutierrez as part of the UCF Coding Bootcamp.

For any questions or issues, please reach out via GitHub or email:

- GitHub: [abelgtrzrs](https://github.com/abelgtzrs)
- Email: abelgtzrs@gmail.com
