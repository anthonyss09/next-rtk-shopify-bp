"use client";
import Link from "next/link";
import { useGetProductByIdQuery } from "../lib/features/products/productsSlice";
import ProductPreview from "./components/ProductPreview";
import ErrorMessage from "./components/ErrorMessage";
import {
  useCreateCartMutation,
  selectCartData,
  useUpdateCartLineMutation,
} from "../lib/features/cart/cartSlice";
import { useRef, useEffect } from "react";
import { useAppSelector } from "../lib/hooks";
import mutateCart from "../utils/helpers/mutateCart";

export default function HomePage() {
  const {
    data: productData,
    isLoading,
    error,
    isSuccess,
    isError,
  } = useGetProductByIdQuery("gid://shopify/Product/7705952845871");
  const cartData = useAppSelector(selectCartData);
  const [updateCartLine] = useUpdateCartLineMutation();

  const cartIdRef = useRef(null);
  useEffect(() => {
    cartIdRef.current = localStorage.getItem("performanceCartId")
      ? JSON.parse(localStorage.getItem("performanceCartId"))
      : null;
  }, []);

  const [createShopifyCart] = useCreateCartMutation();

  let content;

  const loading = <p>loading</p>;

  if (isLoading) {
    content = loading;
  }
  if (isError) {
    content = <ErrorMessage message={error.message} />;
  } else if (isSuccess) {
    content = (
      <ProductPreview
        title={productData.product.title}
        description={productData.product.description}
        imageUrl={productData.product.featuredImage.url}
      />
    );
  }
  return (
    <main className="page-center home-main" role="main">
      <h1>Home Page</h1>
      <h3>Featured Product</h3>
      {content}
      <button
        onClick={() => {
          mutateCart({
            cartData,
            productData,
            createShopifyCart,
            updateCartLine,
          });
        }}
      >
        Mutate Cart
      </button>
      <Link href="/products" className="link">
        <h3>View All Products</h3>
      </Link>
    </main>
  );
}
