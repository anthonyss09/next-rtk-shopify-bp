"use client";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import Image from "next/image";
import cartIcon from "../assets/svgs/cartIcon.svg";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { setCartId, useGetCartQuery } from "../../lib/features/cart/cartSlice";
import {
  selectAuthenticationData,
  useLoginCustomerQuery,
} from "../../lib/features/authentication/authenticationSlice";
import { getRedisCustomer } from "../../services/redis";
import loginShopifyCustomer from "../../utils/helpers/login";

export default function Navbar() {
  const { cartCount, cartId } = useAppSelector((state) => state.cart);
  const { customerAccessToken } = useAppSelector(selectAuthenticationData);
  // const cartIdRef = useRef(cartId);
  // const customerAccessTokenRef = useRef(customerAccessToken);

  const dispatch = useAppDispatch();

  const {
    data: shopifyCartData,
    isLoading: cartDataLoading,
    isSuccess: cartDataSuccess,
    isError: cartDataError,
    error: cartError,
  } = useGetCartQuery(cartId);
  const {
    data: authenticationData,
    isLoading: authenticationLoading,
    isSuccess: authenticationSuccess,
    isError: authenticationIsError,
    error: authenticationError,
  } = useLoginCustomerQuery(customerAccessToken);

  if (cartDataSuccess) {
    console.log("success you have a cart");
    console.log(shopifyCartData);
  } else if (cartDataError) {
    console.log("your cart retrieval threw an error", cartError);
  }
  if (authenticationSuccess) {
    console.log("auth data", authenticationData);
    console.log(customerAccessToken);
    if (authenticationData.customer !== null) {
    }
  } else if (authenticationIsError) {
    console.log("authentication error", console.log(authenticationError));
  }

  useEffect(() => {
    async function getRedisData() {
      const res = await loginShopifyCustomer(customerAccessToken);
      if (res.customer !== null) {
        const redisCustomer = await getRedisCustomer(res.customer.id);
        console.log("the redis customer is", redisCustomer);
        dispatch(setCartId(redisCustomer.cartId));
        // cartIdRef.current = redisCustomer.cartId;
      }
    }
    getRedisData();
  }, []);

  return (
    <section className="navbar-main">
      <Link href="/" className="link">
        {" "}
        <h3>NextJs RTK Shopify endpoints</h3>
      </Link>
      <span>
        <p>{cartCount}</p>
        <Link href="/cart">
          {" "}
          <Image
            src={cartIcon}
            alt="cart icon"
            priority={true}
            width={20}
            height={20}
          />
        </Link>
      </span>
    </section>
  );
}
