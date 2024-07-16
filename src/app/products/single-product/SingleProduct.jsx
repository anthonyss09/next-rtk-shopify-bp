import { useAppDispatch } from "../../../lib/hooks";
import { addItemToCart } from "../../../lib/features/cart/cartSlice";

export default function SingleProduct({ productId }) {
  const dispatch = useAppDispatch();
  return (
    <div className="single-product-main">
      <h5>single product page </h5>
      <div className="single-product-row">
        {productId}{" "}
        <button
          onClick={() => {
            dispatch(addItemToCart(productId));
          }}
        >
          add to cart
        </button>
      </div>
    </div>
  );
}
