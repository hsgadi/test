import { message } from "antd";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { history } from "../Router/browserHistory";

const { REACT_APP_GQL_URL, REACT_APP_GQL_ACCESS_KEY } = process.env;

const cache = new InMemoryCache();

const returnToken = () => {
  const token = localStorage.getItem("access_token");
  return token ? `Bearer ${token}` : null;
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(
      ({ message: errorMessage, statusCode, path, extensions }) => {
        switch (extensions?.code) {
          case "access-denied":
            message.error(errorMessage);
            localStorage.clear();
            history.push("/login");
            break;
          default:
            if (path) {
              switch (statusCode) {
                case 401:
                  message.error(errorMessage);
                  localStorage.clear();
                  history.push("/login");
                  break;
                default:
                  break;
              }
            }
        }
        return null;
      }
    );
  }

  if (networkError) {
    console.log("networkError", networkError);
  }
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const access_token = localStorage.getItem("access_token");

  // Use the setContext method to set the HTTP headers.
  if (access_token) {
    operation.setContext({
      headers: {
        authorization: access_token ? `Bearer ${access_token}` : "",
        ...operation.getContext().headers,
      },
      http: {
        includeExtensions: true,
        includeQuery: true,
      },
    });
  } else {
    operation.setContext({
      headers: {
        ...operation.getContext().headers,
      },
      http: {
        includeExtensions: true,
        includeQuery: true,
      },
    });
  }
  return forward(operation);
});

const httpLink = new createHttpLink({
  uri: "https://" + REACT_APP_GQL_URL,
  headers: {
    "x-hasura-admin-secret": REACT_APP_GQL_ACCESS_KEY,
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://" + REACT_APP_GQL_URL,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": REACT_APP_GQL_ACCESS_KEY,
      },
    },
  },
});

const subscriptionMiddleware = {
  applyMiddleware(options, next) {
    options["authorization"] = returnToken();
    next();
  },
};

wsLink.subscriptionClient.use([subscriptionMiddleware]);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "none",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "none",
  },
  mutate: {
    errorPolicy: "all",
  },
};

let links = [errorLink, authLink, splitLink];

export const client = new ApolloClient({
  link: ApolloLink.from(links),
  cache,
  defaultOptions: defaultOptions,
});

client.restartWebsocketConnection = () => {
  if (wsLink.subscriptionClient.client) {
    // Close socket connection which will also unregister subscriptions on the server-side.
    wsLink.subscriptionClient.close();

    // Reconnect to the server.
    wsLink.subscriptionClient.connect();

    // // Reregister all subscriptions.
    // Object.keys(wsLink.operations).forEach((id) => {
    //   wsLink.sendMessage(id, MessageTypes.GQL_START, wsLink.operations[id].options);
    // });
  }
};
