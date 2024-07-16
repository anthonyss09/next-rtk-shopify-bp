import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  `https://${process.env.NEXT_PUBLIC_SHOP_NAME}.myshopify.com/api/${process.env.NEXT_PUBLIC_VERSION}/graphql.json`
);

client.setHeader(
  "X-Shopify-Storefront-Access-Token",
  process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
);

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({
    client,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
    },
  }),

  tagTypes: ["Cart", "Customer"],
  endpoints: (build) => ({}),
});

export const { useSetMetaMutation } = apiSlice;
