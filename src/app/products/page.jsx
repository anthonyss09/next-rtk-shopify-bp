"use client";
import { useGetProductsQuery } from "../../lib/features/products/productsSlice";
import ProductsList from "./ProductList";

export default function ProductsPage() {
  const {
    data: productsData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();

  let content;
  if (isLoading) {
    content = <p>loading</p>;
  } else if (isSuccess) {
    console.log("succcceeed", productsData);
    content = <ProductsList productList={productsData.products.edges} />;
  } else if (error) {
    console.log(error);
    content = <p>some error</p>;
  }
  return (
    <main className="page-center" role="main">
      {" "}
      {content}
    </main>
  );
}
