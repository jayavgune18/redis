# Redis Node.js Demo

A small Node.js project that demonstrates using Redis with `ioredis` and an Express server.

## Requirements

- Node.js 18 or newer
- A Redis server running locally on the default port (`6379`)

## Installation

```bash
npm install
```

## Run the server

```bash
node server.js
```

The API runs at [http://localhost:9000](http://localhost:9000).

## API

### `GET /`

Fetches TODO items from JSONPlaceholder and returns them as JSON. The server uses Redis for caching with an expiration time.

Example:

```bash
curl http://localhost:9000/
```

## Example files

- `server.js` - Express API server and TODO request.
- `client.js` - Redis client connection.
- `string.js` - Redis string command example.
- `hashmap.js` - Redis hash command examples.
- `list.js` - Redis list command example.
- `set.js` - Redis sorted-set command examples.

## Available npm commands

The project currently has no automated test command. Start the application with:

```bash
node server.js
```

## Interview questions and answers

For Redis interview preparation notes, see [redis-interview-questions-answers.md](./redis-interview-questions-answers.md).
