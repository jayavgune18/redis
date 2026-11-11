const client = require("./client");
const subscriber = client.duplicate();

async function init() {
  const channel = "notifications";

  try {
    const receivedMessage = new Promise((resolve) => {
      subscriber.once("message", (receivedChannel, message) => {
        resolve({ receivedChannel, message });
      });
    });

    await subscriber.subscribe(channel);
    await client.publish(channel, "Hello from Redis Pub/Sub!");

    const { receivedChannel, message } = await receivedMessage;
    console.log(`Received on ${receivedChannel}: ${message}`);
  } finally {
    await subscriber.quit();
    await client.quit();
  }
}

init().catch((error) => {
  console.error("Redis Pub/Sub example failed:", error);
  process.exitCode = 1;
});
