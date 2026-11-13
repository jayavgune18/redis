const express = require('express');
const axios = require('axios').default;
const client = require('./client');

const CACHE_KEY = 'todos';

async function fetchTodos(redisClient = client, httpClient = axios) {
  const cachedValue = await redisClient.get(CACHE_KEY);
  if (cachedValue) {
    return JSON.parse(cachedValue);
  }

  const { data } = await httpClient.get('https://jsonplaceholder.typicode.com/todos');
  await redisClient.set(CACHE_KEY, JSON.stringify(data));
  await redisClient.expire(CACHE_KEY, 30);
  return data;
}

function createApp(redisClient = client, httpClient = axios) {
  const app = express();

  app.get('/', async (req, res) => {
    try {
      const todos = await fetchTodos(redisClient, httpClient);
      return res.json(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      return res.status(500).json({ error: 'Failed to fetch todos' });
    }
  });

  return app;
}

const app = createApp();

if (require.main === module) {
  app.listen(9000, () => {
    console.log('server is running 9000');
  });
}

module.exports = { app, createApp, fetchTodos };
