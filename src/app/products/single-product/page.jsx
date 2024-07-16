"use client";
import { useSearchParams } from "next/navigation";
import SingleProduct from "./SingleProduct";

export default function SingleProductPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  return (
    <div className="page-center" role="main">
      {" "}
      <SingleProduct productId={productId} />
    </div>
  );
}
