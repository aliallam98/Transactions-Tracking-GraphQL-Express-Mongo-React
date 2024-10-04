import express from "express";
import http from "http";

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { config } from "dotenv";

// import session from "express-session";
// import passport from "passport";
// import { GraphQLLocalStrategy, buildContext } from "graphql-passport";

import mergedTypeDefs from "./src/graphQL/typeDefs/index.js";
import mergedResolvers from "./src/graphQL/resolvers/index.js";

const app = express();
const httpServer = http.createServer(app);
config()


// Create Server
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // context: ({ req, res }) => buildContext({ req, res, User }),
});


//Start Server
await server.start();
server.applyMiddleware({ app }); //, cors: false

app.listen({ port: process.env.PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
});
