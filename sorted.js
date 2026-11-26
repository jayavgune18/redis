const client = require("./client");

async function init() {
    await client.zadd("leaderboard", 100, "Alice");
    await client.zadd("leaderboard", 80, "Bob");
    await client.zadd("leaderboard", 90, "Charlie");

    const leaders = await client.zrange("leaderboard", 0, -1, "WITHSCORES");
    console.log(leaders);
}

init();
