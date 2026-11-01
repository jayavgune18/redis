const client = require("./client");

async function init() {
  const key = "doc:embedding";
  const vector = [0.12, 0.84, -0.33, 0.91, 0.67];

  await client.set(key, JSON.stringify(vector));

  const value = await client.get(key);
  const parsed = value ? JSON.parse(value) : [];

  console.log("Stored vector:", parsed);
  console.log("Vector length:", parsed.length);
  console.log("First item:", parsed[0]);
}

init();
