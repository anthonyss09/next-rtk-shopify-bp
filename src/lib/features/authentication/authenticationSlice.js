import { apiSlice } from "../api/apiSlice";
import { createSlice } from "@reduxjs/toolkit";

let customerAccessToken;
if (typeof localStorage !== "undefined") {
  customerAccessToken = JSON.parse(
    localStorage.getItem("performanceCustomerAccessToken")
  );
} else {
  customerAccessToken = null;
}
const initialState = {
  customerAccessToken,
  customerData: null,
};

const extendeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    registerCustomer: build.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        document: `mutation {
  customerCreate(input: {firstName:"${firstName}",lastName:"${lastName}",email:"${email}",password:"${password}"}) {
    customer {
      firstName
      lastName
      email
      phone
      acceptsMarketing
      id
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}`,
      }),
    }),

    customerUpdate: build.mutation({
      query: ({ customerAccessToken }) => ({
        document: `
        mutation {
  customerUpdate(customer: {phone: "+15166768575"}, customerAccessToken: "${customerAccessToken}") {
    customer {
      id
      phone
    }
    userErrors {
      field
      message
    }
  }
}
        `,
      }),
    }),

    createCustomerToken: build.mutation({
      query: ({ email, password }) => ({
        document: `mutation customerAccessTokenCreate {
  customerAccessTokenCreate(input: {email: "${email}", password: "${password}"}) {
    customerAccessToken {
      accessToken
    }
    customerUserErrors {
      message
    }
  }
}`,
      }),
      async onQueryStarted(
        { email, password },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const response = await queryFulfilled;
          console.log("query fulfilled");
          const cat =
            response.data.customerAccessTokenCreate.customerAccessToken;
          console.log("the proper response is", cat);
          if (cat !== null) {
            dispatch(setCustomerAccessToken(cat.accessToken));
            console.log("set cat", cat);
            localStorage.setItem(
              "performanceCustomerAccessToken",
              JSON.stringify(cat.accessToken)
            );
            localStorage.removeItem("performanceCartId");
          }
        } catch (error) {
          console.log("some error occured creating access token", error);
        }
      },
      invalidatesTags: ["Customer", "Cart"],
    }),

    loginCustomer: build.query({
      query: (customerAccessToken) => ({
        document: `query {
  customer(customerAccessToken: "${customerAccessToken}") {
    id
    firstName
    lastName
    acceptsMarketing
    email
    phone
  }
}`,
      }),
      async onQueryStarted(
        customerAccessToken,
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const { data: authData } = await queryFulfilled;
          if (authData.customer !== null) {
            dispatch(setCustomerData(authData.customer));
          } else if (authData.customer === null) {
            localStorage.remove("performanceCustomerAccessToken");
          }
        } catch (error) {}
      },
      providesTags: ["Customer"],
    }),
  }),
});

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCustomerAccessToken(state, action) {
      state.customerAccessToken = action.payload;
    },
    setCustomerData(state, action) {
      state.customerData = action.payload;
    },
  },
});

export const {
  useRegisterCustomerMutation,
  useLoginCustomerQuery,
  useCreateCustomerTokenMutation,
  useCustomerUpdateMutation,
} = extendeApi;

export const { setCustomerAccessToken, setCustomerData } =
  authenticationSlice.actions;

export const selectAuthenticationData = (state) => state.authentication;

export default authenticationSlice.reducer;
