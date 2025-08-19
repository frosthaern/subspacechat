"use client";
import { ApolloProvider } from "@apollo/client";
import { NhostProvider } from "@nhost/nextjs";
import nhost from "@/lib/nhost";
import client from "@/lib/apollo_client";
export default function Providers({ children }) {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </NhostProvider>
  );
}
