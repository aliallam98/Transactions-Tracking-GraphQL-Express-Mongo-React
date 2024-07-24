import express from "express";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import passport from "passport";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";



import mergeTypeDefs from "./src/graphQL/typeDefs/index.js";
import mergedResolvers from "./src/graphQL/resolvers/index.js";

const app = express();

const server = new ApolloServer({
  typeDefs: mergeTypeDefs,
  resolvers: mergedResolvers,
  context: ({ req, res }) => buildContext({ req, res, User }),
});

server.applyMiddleware({ app, cors: false });

app.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
