import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "https://tmdb-apollo.herokuapp.com/",
    headers: {
      authorization: localStorage.getItem("token")
      // 'client-name': 'Space Explorer [web]',
      // 'client-version': '1.0.0',
    }
  }),
  initializers: {
    isLoggedIn: () => !!localStorage.getItem("token"),
    cartItems: () => []
  }
  // resolvers,
  // typeDefs,
});

// const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `;

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
