const client = require("./client");

async function init() {
    await client.expire("msg:4", 10)
     const result = await client.get("msg:4"); 
     console.log( "Result ->",result);
     
}

init();