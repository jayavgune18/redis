const express =  require('express');

const axios = require('axios').default;
const client = require('./client');

const app = express();

app.get("/",async(req, res)=>{
    
    const cachesValue = await client.get('todos  ');
    if(cachesValue) return res.json(JSON.parse(cachesValue))

    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos');
    await client.set("todus", JSON.stringify(data));
    await client.expire('todus', 30);
    return res.json(data);
})

app.listen(9000, ()=>{
    console.log("sever is running 9000"); 
});