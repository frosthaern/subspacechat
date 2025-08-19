"use client";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import nhost from "@/lib/nhost";
import { ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://jelsdyikqlournpamnbm.hasura.ap-south-1.nhost.run/v1/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = nhost.auth.getAccessToken();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

const authedHttpLink = authLink.concat(httpLink);

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "wss://jelsdyikqlournpamnbm.hasura.ap-south-1.nhost.run/v1/graphql",
          connectionParams: () => {
            const token = nhost.auth.getAccessToken();
            return {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
          },
        })
      )
    : null;

const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        authedHttpLink
      )
    : authedHttpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
