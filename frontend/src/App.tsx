import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import GridBackground from "./components/GridBackground.tsx";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // change it when backend is ready
  cache: new InMemoryCache(),
  credentials: "include", // send cookies along every req
});

function App() {
  return (
    <GridBackground>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </GridBackground>
  );
}

export default App;
