import express, { Application } from "express";
import http from "node:http";
import path from "path";
import db from "./config/connection.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./services/auth.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app: Application = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // or '*'
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // preflight response
  }
  return next();
});

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
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
  console.log("Attempting to connect to MongoDB...");

  db.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
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
