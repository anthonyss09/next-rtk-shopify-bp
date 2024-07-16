"use client";
import { useAppSelector } from "../../lib/hooks";
import Link from "next/link";
import Image from "next/image";

export default function ProductsList({ productList }) {
  const pList = (
    <ul>
      {productList.map((product, index) => {
        return (
          <Link
            href={`/products/single-product?productId=product-${index}`}
            className="link"
            key={index}
          >
            <li key={`product-${index}`}>
              <p>{product.node.title}</p>
              <Image
                priority
                src={product.node.featuredImage.url}
                height={100}
                width={150}
                alt="product preview"
              />
            </li>
          </Link>
        );
      })}
    </ul>
  );
  return (
    <div className="product-list-main">
      <h3 className="product-list-h3">Products List</h3>
      {pList}
    </div>
  );
}
