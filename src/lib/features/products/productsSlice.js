import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
  productList: {},
};

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        document: `query {
  products(first:5) {
    edges {
      node {
        title
        id
        featuredImage {
          url
        }
      }
    }
  }
}`,
      }),
    }),
    getProductById: build.query({
      query: (productId) => ({
        document: `query {
  product(id: "${productId}") {
    id
    title
    description
    featuredImage {url}
     ... on Product {
      variants(first: 5) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
}`,
      }),
    }),
  }),
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductToList(state, action) {
      state.productList[action.payload.id] = action.payload;
    },
  },
});

export default productsSlice.reducer;

export const selectProductsData = (state) => state.products;

export const { addProductToList } = productsSlice.actions;

export const { useGetProductByIdQuery, useGetProductsQuery } = extendedApi;
