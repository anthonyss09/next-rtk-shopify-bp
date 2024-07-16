import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createRedisCustomer } from "../../../services/redis";

let cartId;
var customerAccessToken;

if (typeof localStorage !== "undefined") {
  cartId = localStorage.getItem("performanceCartId")
    ? JSON.parse(localStorage.getItem("performanceCartId"))
    : "gid://shopify/Cart/null";

  customerAccessToken = localStorage.getItem("performanceCustomerAccessToken")
    ? JSON.parse(localStorage.getItem("performanceCustomerAccessToken"))
    : null;
} else {
  cartId = "gid://shopify/Cart/null";
  customerAccessToken = null;
}

const initialState = {
  cartItemsMap: { "product-0": 1 },
  cartCount: 0,
  cartId,
  cartData: null,
};

const extendedApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    updateCartLine: build.mutation({
      query: ({ cartId, lineId, quantity, productTitle, productImageUrl }) => ({
        document: `mutation {
  cartLinesUpdate(
    cartId: "${cartId}"

    lines: {
      id: "${lineId}"

      quantity: ${quantity}
      attributes: [
      {
          key: "title"
          value: "${productTitle}"
          },
          {
          key: "imageUrl"
          value: "${productImageUrl}"
          }
      ]
    }
  ) {
    cart {
        id
   }
           userErrors {
      field
      message
    }
  }
}
`,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(
        { cartId, lineId, quantity, productTitle, productImageUrl },
        { dispatch, queryFulfilled, getState }
      ) {
        const { data: cartData } = await queryFulfilled;
        console.log("something happened updating", cartData);
        console.log("the og keys", lineId, quantity);
      },
    }),

    getCart: build.query({
      query: (sessionId) => ({
        document: `query {
  cart(id:"${sessionId}") {
    id
    createdAt
    updatedAt
    checkoutUrl
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
  }
}`,
      }),
      async onQueryStarted(sessionId, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: cartData } = await queryFulfilled;
          if (cartData.cart !== null) {
            dispatch(setCartData(cartData.cart));
            dispatch(setCartId(cartData.cart.id));
            let cartCount = 0;
            cartData.cart.lines.edges.map((edge) => {
              cartCount += edge.node.quantity;
            });
            dispatch(setCartCount(cartCount));
          } else if (cartData.cart === null) {
            localStorage.removeItem("performanceCartId");
          }
        } catch (error) {
          console.log("some error occured", error);
        }
      },
      providesTags: ["Cart"],
    }),

    createCart: build.mutation({
      query: ({ merchId, productTitle, productImageUrl }) => ({
        document: `mutation {
        cartCreate(input: {
          lines: [
            {
              quantity: 1,
              merchandiseId: "${merchId}",
               attributes: 
          [{
          key: "title"
          value: "${productTitle}"
          },
          {
          key: "imageUrl"
          value: "${productImageUrl}"
          }]
            },
  
          ],
         
        }) { cart{
         id
        createdAt
        updatedAt  
        attributes {
        key 
        value
        }
        }
        }
        }`,
      }),
      invalidatesTags: ["Customer", "Cart"],

      async onQueryStarted(
        { merchId, productTitle, productImageUrl },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const { data: cartData } = await queryFulfilled;
          const customer = getState().authentication.customerData;
          if (customer !== null) {
            dispatch(setCartId(cartData.cartCreate.cart.id));
            const redisResponse = await createRedisCustomer({
              customerId: customer.id,
              cartId: cartData.cartCreate.cart.id,
            });
            console.log(redisResponse);
          } else {
            localStorage.setItem(
              "performanceCartId",
              JSON.stringify(cartData.cartCreate.cart.id)
            );
          }
        } catch (error) {
          console.log("some error occured", error);
        }
      },
    }),
  }),
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      if (state.cartItemsMap[action.payload]) {
        state.cartItemsMap[action.payload]++;
      } else {
        state.cartItemsMap[action.payload] = 1;
      }
      state.cartCount++;
    },
    removeItemFromCart(state, action) {
      if (state.cartItemsMap[action.payload] <= 1) {
        delete state.cartItemsMap[action.payload];
      } else {
        state.cartItemsMap[action.payload]--;
      }
      state.cartCount--;
    },
    setCartId(state, action) {
      state.cartId = action.payload;
    },
    setCartData(state, action) {
      state.cartData = action.payload;
    },
    setCartCount(state, action) {
      state.cartCount = action.payload;
    },
  },
});

export default cartSlice.reducer;

export const {
  addItemToCart,
  removeItemFromCart,
  setCartId,
  setCartData,
  setCartCount,
} = cartSlice.actions;

export const selectCartData = (state) => state.cart;

export const {
  useGetCartQuery,
  useCreateCartMutation,
  useUpdateCartLineMutation,
} = extendedApi;
