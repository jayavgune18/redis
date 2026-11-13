const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../server');

async function withServer(app, callback) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));

  const { port } = server.address();

  try {
    await callback(port);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test('GET / returns cached todos without calling the remote API', async () => {
  const redisClient = {
    async get(key) {
      assert.equal(key, 'todos');
      return JSON.stringify([{ id: 1, title: 'cached todo' }]);
    },
    async set() {
      throw new Error('set should not run when cache is available');
    },
    async expire() {
      throw new Error('expire should not run when cache is available');
    },
  };

  const httpClient = {
    async get() {
      throw new Error('remote API should not be called when cache is present');
    },
  };

  await withServer(createApp(redisClient, httpClient), async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), [{ id: 1, title: 'cached todo' }]);
  });
});

test('GET / fetches and caches todo data when no cache entry exists', async () => {
  const calls = [];
  const redisClient = {
    async get(key) {
      calls.push(['get', key]);
      return null;
    },
    async set(key, value) {
      calls.push(['set', key, value]);
    },
    async expire(key, ttl) {
      calls.push(['expire', key, ttl]);
    },
  };

  const httpClient = {
    async get(url) {
      calls.push(['http', url]);
      return {
        data: [
          { id: 1, title: 'fresh todo' },
          { id: 2, title: 'another todo' },
        ],
      };
    },
  };

  await withServer(createApp(redisClient, httpClient), async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), [
      { id: 1, title: 'fresh todo' },
      { id: 2, title: 'another todo' },
    ]);
  });

  assert.deepEqual(calls.slice(0, 4), [
    ['get', 'todos'],
    ['http', 'https://jsonplaceholder.typicode.com/todos'],
    ['set', 'todos', JSON.stringify([
      { id: 1, title: 'fresh todo' },
      { id: 2, title: 'another todo' },
    ])],
    ['expire', 'todos', 30],
  ]);
});
