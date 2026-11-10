const client = require("./client");

async function init() {
  const stream = "orders:events";

  try {
    await client.xgroup("CREATE", stream, "order-events", "$", "MKSTREAM");
    console.log("Consumer group created");
  } catch (err) {
    if (!String(err.message).includes("BUSYGROUP")) {
      throw err;
    }
    console.log("Consumer group already exists");
  }

  const entry1 = await client.xadd(
    stream,
    "*",
    "event",
    "created",
    "order_id",
    "1001",
    "status",
    "pending"
  );
  console.log("Entry 1 ID:", entry1);

  const entry2 = await client.xadd(
    stream,
    "*",
    "event",
    "paid",
    "order_id",
    "1001",
    "status",
    "paid",
    "amount",
    "250"
  );
  console.log("Entry 2 ID:", entry2);

  const entries = await client.xrange(stream, "-", "+");
  console.log("All stream entries:", entries);

  const latestEntries = await client.xrevrange(stream, "+", "-", "COUNT", 2);
  console.log("Latest stream entries:", latestEntries);

  const newMessages = await client.xreadgroup(
    "GROUP",
    "order-events",
    "consumer-1",
    "COUNT",
    2,
    "BLOCK",
    2000,
    "STREAMS",
    stream,
    ">"
  );
  console.log("Messages read by consumer group:", newMessages);
}

init();
