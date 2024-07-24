import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import GridBackground from "./components/GridBackground.tsx";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GridBackground>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </GridBackground>
  </React.StrictMode>
);
