import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from "dotenv";

import session from "express-session";
import passport from "passport";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";


import connectToDB from "./src/DB/databaseConnection.js";
import passportConfigure from "./src/passport/passport.config.js";

import mergedTypeDefs from "./src/graphQL/typeDefs/index.js";
import mergedResolvers from "./src/graphQL/resolvers/index.js";
import { buildContext } from 'graphql-passport';


dotenv.config();
passportConfigure();

const app = express();
const httpServer = http.createServer(app);

// To store session in DB
const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "Sessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true, // XSS attacks
    },
    store,
    resave: false, // this option specifies whether to save the session to the store on every request
    saveUninitialized: false, // option specifies whether to save uninitialized sessions
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Create Server
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
	"/graphql",
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
	express.json(),
	// expressMiddleware accepts the same arguments:
	// an Apollo Server instance and optional configuration options
	expressMiddleware(server, {
		context: async ({ req, res }) => buildContext({ req, res }),
	})
);

// Ensure we wait for our server to start

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
connectToDB();



console.log(`🚀 Server ready at http://localhost:4000/graphql`);
