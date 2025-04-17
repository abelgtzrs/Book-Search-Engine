import express, { Application } from "express";
import http from "node:http";
import path from "node:path";
import db from "./config/connection.js";

// ⬇️ NEW imports
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./services/auth.js";

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

// Apollo Server Setup
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      if (process.env.NODE_ENV === "production") {
        delete err.extensions?.exception;
      }
      return err;
    },
  });

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => authMiddleware(req),
    })
  );

  // Open DB then start HTTP server
  db.once("open", () => {
    http
      .createServer(app)
      .listen(PORT, () =>
        console.log(`🚀  GraphQL ready at http://localhost:${PORT}/graphql`)
      );
  });
}

startApolloServer().catch((err) => {
  console.error("Apollo Server failed to start", err);
});
