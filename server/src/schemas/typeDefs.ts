import { gql } from "graphql-tag";

export const typeDefs = gql`
  # ----- Data types -----
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    # virtual field, see resolvers.User.bookCount
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  # ----- Input types for mutations -----
  input BookInput {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String
    link: String
  }

  # ----- Queries -----
  type Query {
    # returns the currently‑logged‑in user
    me: User
  }

  # ----- Mutations -----
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;
