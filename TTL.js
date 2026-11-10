const client = require("./client");

async function init() {
  const key = "session:ttl-demo";

  await client.set(key, "active", "EX", 60);
  console.log("Initial TTL (seconds):", await client.ttl(key));
  console.log("Remaining TTL (milliseconds):", await client.pttl(key));

  await client.expire(key, 30);
  console.log("Updated TTL (seconds):", await client.ttl(key));
}

init();
