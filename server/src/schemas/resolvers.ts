// server/src/schemas/resolvers.ts
import { AuthenticationError } from "@apollo/server/errors";
import { User } from "../models/User.js";
import { signToken } from "../services/auth.js";

export const resolvers = {
  Query: {
    // GET /me
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      return User.findById(context.user._id);
    },
  },

  Mutation: {
    // POST /addUser
    addUser: async (_parent: any, { username, email, password }: any) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // POST /login
    login: async (_parent: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError("No user with this email");
      const valid = await user.isCorrectPassword(password);
      if (!valid) throw new AuthenticationError("Incorrect password");
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // PUT /saveBook
    saveBook: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) throw new AuthenticationError("Not logged in");
      return User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );
    },

    // DELETE /removeBook
    removeBook: async (_parent: any, { bookId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError("Not logged in");
      return User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },

  // Resolve the virtual field bookCount on User
  User: {
    bookCount: (parent: any) => parent.savedBooks.length,
  },
};
