import express from "express";
import http from "http";

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { expressMiddleware } from '@apollo/server/express4';

import { config } from "dotenv";

import session from "express-session";
import passport from "passport";
import cors from "cors"

import connectMongo from "connect-mongodb-session"

// import { GraphQLLocalStrategy, buildContext } from "graphql-passport";

import mergedTypeDefs from "./src/graphQL/typeDefs/index.js";
import mergedResolvers from "./src/graphQL/resolvers/index.js";
import connectToDB from "./src/DB/databaseConnection.js";

const app = express();
const httpServer = http.createServer(app);
config()

const MongoDBStore = connectMongo(session)
const store = new MongoDBStore({
  uri:process.env.DB_URL,
  collection:"Sessions",
})

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(session({
  secret:process.env.SESSION_SECRET,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true  // XSS attacks
  },
  store,
  resave: false,
  saveUninitialized: false

}))
app.use(passport.initialize)
app.use(passport.session)

// Create Server
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // context: ({ req, res }) => buildContext({ req, res, User }),
});

//Start Server
await server.start();
connectToDB()
server.applyMiddleware({ app }); //, cors: false

app.use("/",
  cors(),
  express.json(),
  expressMiddleware(server,{
    context: async({req,res}) => ({req,res})
  })
)





app.listen({ port: process.env.PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
});
