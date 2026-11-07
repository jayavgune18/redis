const client = require("./client");

async function init() {
  const key = "user:1";
  const user = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    active: true,
  };

  await client.set(key, JSON.stringify(user));

  const value = await client.get(key);
  const parsed = value ? JSON.parse(value) : null;

  console.log("Stored JSON:", parsed);
}

init();
