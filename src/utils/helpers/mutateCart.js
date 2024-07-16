export default async function mutateCart({
  cartData,
  productData,
  createShopifyCart,
  updateCartLine,
}) {
  let merchQuantity;
  let productTitle;
  let productImageUrl;
  let lineId;
  const merchId = productData.product.variants.edges[0].node.id;

  if (cartData.cartData) {
    cartData.cartData.lines.edges.map((edge) => {
      if (edge.node.merchandise.id === merchId) {
        lineId = edge.node.id;
        merchQuantity = edge.node.quantity;
        productTitle = edge.node.attributes[0].value;
        productImageUrl = edge.node.attributes[1].value;
      }
    });
    console.log("mutate existing cart");
    if (lineId) {
      console.log("update line");
      console.log("the cart id is ", cartData.cartData.id);
      console.log("the line id", lineId);
      try {
        const res = await updateCartLine({
          cartId: cartData.cartData.id,
          lineId: lineId,
          quantity: merchQuantity + 1,
          productTitle: productTitle,
          productImageUrl: productImageUrl,
        });
        console.log("the update response", res);
      } catch (error) {
        console.log("an error occured updating lines", error);
      }
    } else {
      console.log("add new line to cart");
    }
  } else {
    console.log("no cart, create one");
    console.log(productData.product);
    const res = await createShopifyCart({
      merchId: productData.product.variants.edges[0].node.id,
      productTitle: productData.product.title,
      productImageUrl: productData.product.featuredImage.url,
    });
    console.log(res);
  }
}
