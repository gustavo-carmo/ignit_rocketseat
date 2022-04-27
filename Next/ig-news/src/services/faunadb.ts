import { Client } from "faunadb";

export const faunaClient = new Client({
  secret: process.env.FAUNADB_KEY,
  domain: process.env.FAUNADB_DOMAIN,
  port: 443,
  scheme: "https",
  timeout: 30,
  queryTimeout: 2000,
});
