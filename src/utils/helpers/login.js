export default async function loginShopifyCustomer(customerAccessToken) {
  // console.log("were using", customerAccessToken);
  try {
    const { data } = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOP_NAME}.myshopify.com/api/${process.env.NEXT_PUBLIC_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: ` query {
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
      }
    ).then((response) => response.json());
    console.log("big data ttime", data);
    return data;
  } catch (error) {
    console.log("major error in login department");
  }
}
