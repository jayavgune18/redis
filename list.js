const client = require("./client");

async function init() {

    // await client.lpush("message", 1);
    // await client.lpush("message", 2);
    // await client.lpush("message", 3);
    // await client.lpush("message", 4);
    // await client.rpush("message", 0);
   
    const result =  await client.lpop("message");
    console.log("Result -> ",result);
    
}

init();