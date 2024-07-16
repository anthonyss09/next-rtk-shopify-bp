import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://amazed-cow-55735.upstash.io",
  token: "Adm3AAIncDFiMDFiNTE3ZDk5M2Q0MTI1ODkwYWU1YzYzNmViYzk1NHAxNTU3MzU",
});

export async function createRedisCustomer({ customerId, cartId = null }) {
  const newRedisCustomer = await redis.set(customerId, { customerId, cartId });

  return newRedisCustomer;
}

export async function getRedisCustomer(customerId) {
  try {
    var redisData = await redis.get(customerId);
    // console.log("redis data is", redisData);
  } catch (error) {
    console.log("error fetching redis data", error);
  }
  return redisData;
}
