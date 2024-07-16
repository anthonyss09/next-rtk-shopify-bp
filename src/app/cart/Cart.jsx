"use client";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import {
  addItemToCart,
  removeItemFromCart,
  selectCartData,
  useUpdateCartLineMutation,
} from "../../lib/features/cart/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cart = useAppSelector(selectCartData);
  const [updateCartLine] = useUpdateCartLineMutation();
  const lines = cart.cartData ? cart.cartData.lines : null;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddItem = () => {
    dispatch(addItemToCart());
  };

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart());
  };

  const hanldeCheckout = () => {
    console.log("checkout clicked", cart.cartData.checkoutUrl);
    const checkoutUrl = cart.cartData.checkoutUrl;
    router.push(checkoutUrl);
  };

  const itemList = (
    <ul className="cart-items-list">
      <h5>Cart items</h5>
      {lines ? (
        lines.edges.map((edge, index) => (
          <div key={index} className="cart-item-row">
            {" "}
            <Image
              priority={true}
              src={edge.node.attributes[1].value}
              alt="product preview"
              width={150}
              height={100}
            />
            <span>{edge.node.attributes[0].value}</span>
            <li key={index}>{edge.node.quantity}</li>
            <div className="cart-item-buttons">
              <button
                onClick={async () => {
                  console.log("remove item", {
                    cartId: cart.cartId,
                    lineId: edge.node.id,
                    quantity: edge.node.quantity - 1,
                  });
                  const res = await updateCartLine({
                    cartId: cart.id,
                    lineId: edge.node.id,
                    quantity: edge.node.quantity - 1,
                    productTitle: edge.node.attributes[0].value,
                    productImageUrl: edge.node.attributes[1].value,
                  });
                  console.log("the response is", res);
                }}
              >
                -
              </button>
              <button
                onClick={async () => {
                  {
                    console.log("add item", {
                      cartId: cart.cartId,
                      lineId: edge.node.id,
                      quantity: edge.node.quantity + 1,
                    });
                    const res = await updateCartLine({
                      cartId: cart.id,
                      lineId: edge.node.id,
                      quantity: edge.node.quantity + 1,
                      productTitle: edge.node.attributes[0].value,
                      productImageUrl: edge.node.attributes[1].value,
                    });
                    console.log("the response is", res);
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>loading</p>
      )}
    </ul>
  );

  return (
    <>
      {" "}
      <div className="cart-main">{itemList}</div>
      <button onClick={hanldeCheckout}>checkout</button>
    </>
  );
}
