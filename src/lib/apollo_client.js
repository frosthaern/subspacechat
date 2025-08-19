"use client";

import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import nhost from "@/lib/nhost";
import { ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL,
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
          url: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_WSS,
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
