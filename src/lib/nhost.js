import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_HASURA_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_HASURA_REGION,
});

export default nhost;
