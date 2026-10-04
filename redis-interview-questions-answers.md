# Redis Interview Questions and Answers

This document covers common Redis interview questions and answers for backend, system design, and Node.js engineering interviews.

## 1. What is Redis?

Redis is an open-source, in-memory data store. It is commonly used as a cache, message broker, queue, rate limiter, and lightweight database. Redis is known for very fast read/write performance because it stores data in memory instead of on disk.

## 2. Why is Redis so fast?

Redis keeps data in RAM and uses optimized in-memory data structures. It also avoids heavy SQL query parsing and relational overhead. This makes Redis extremely fast for simple key-value lookups and data processing.

## 3. What are the main data structures supported by Redis?

Redis supports several data types:

- Strings: simple key-value data like counters and tokens
- Hashes: object-like data such as user profiles
- Lists: ordered collections for queues and logs
- Sets: unique values for tags or membership checks
- Sorted Sets: sets with score-based ordering, used for leaderboards
- Bitmaps: efficient binary data storage
- HyperLogLog: approximate unique count
- Streams: append-only log-like data structures for event processing

## 4. What is the difference between Redis and MySQL/PostgreSQL?

Redis is mainly an in-memory, key-value style store optimized for speed and simplicity. Traditional relational databases are better suited for complex joins, transactions, and structured relational modeling. Redis is often used alongside SQL databases rather than replacing them completely.

## 5. What is Redis persistence?

Redis can persist data using:

- RDB (Redis Database Backup): periodic snapshots of the dataset
- AOF (Append-Only File): logs every write command for stronger durability

Redis also supports a hybrid model combining both for better recovery and performance.

## 6. What is a TTL in Redis?

TTL means Time To Live. It is the expiration time assigned to a key. Redis automatically removes expired keys, which is very useful for caching temporary data such as sessions, tokens, and API responses.

Example:

```bash
SET user:1001 "Alice"
EXPIRE user:1001 300
```

This key will expire in 300 seconds.

## 7. How is Redis used for caching?

Redis is often used in front of slower systems like databases or external APIs. Typical strategies include:

- cache frequently requested data
- store computed results with TTL
- invalidate or refresh entries when data changes
- reduce database load and response time

A common pattern is: read from Redis first, fall back to the database, then write back to Redis.

## 8. What is the difference between a list and a set in Redis?

- List preserves order and allows duplicates
- Set does not preserve order and stores unique values only

A list is useful for queues and message ordering, while a set is useful for membership checks or deduplication.

## 9. What are sorted sets in Redis?

A sorted set is a set where each member has a score. The members are kept unique, and they can be sorted by that score. This is commonly used for:

- leaderboards
- ranking systems
- time-based feed ordering
- priority queues

Example:

```bash
ZADD leaderboard 100 "alice"
ZADD leaderboard 90 "bob"
ZRANGE leaderboard 0 -1 WITHSCORES
```

## 10. What is Redis Pub/Sub?

Pub/Sub is Redis messaging feature where publishers send messages to channels and subscribers receive them asynchronously. It is useful for notifications, live updates, and event delivery.

Example:

```bash
PUBLISH notifications "new order created"
```

This is not a durable queue by default, so it is better for real-time communication than for reliable message storage.

## 11. What is a Redis transaction?

Redis transactions let you group multiple commands so they execute sequentially as one atomic unit. Commands inside a transaction are wrapped with `MULTI` and `EXEC`.

Example:

```bash
MULTI
SET a 10
SET b 20
EXEC
```

Redis guarantees that the transaction executes atomically, though not all commands are executed in a SQL-like locking model.

## 12. What is the difference between Redis and Memcached?

Redis and Memcached are both in-memory caches, but Redis is more feature-rich.

- Redis has persistence, replication, clustering, pub/sub, and richer data types
- Memcached is simpler and focused on basic key-value caching
- Redis supports more complex use cases beyond pure caching

## 13. How do you handle memory in Redis?

Memory management is critical because Redis stores everything in RAM. Best practices include:

- set appropriate TTL values
- avoid storing unnecessary large objects
- use compact data structures
- monitor memory usage with `INFO memory`
- configure eviction policies when memory is full

## 14. What is Redis eviction policy?

When Redis hits its memory limit, it can remove keys according to an eviction policy such as:

- `noeviction`: reject new writes
- `allkeys-lru`: evict least recently used keys
- `volatile-lru`: evict only expired/TTL-enabled keys
- `allkeys-random`, `volatile-random`

This is important for cache workloads where data can be regenerated.

## 15. How does Redis help in a Node.js application?

In Node.js, Redis is commonly used for:

- caching API responses
- session storage
- rate limiting
- job queues
- real-time notifications
- distributed locks

Libraries such as `ioredis` and `redis` make it easy to use Redis from Node.js.

## 16. What is the role of Redis in this project?

This repository is a small Node.js and Redis demo. It shows how to:

- connect to Redis using `ioredis`
- store and read string values
- work with hashes, lists, and sets
- cache API results from JSONPlaceholder
- use expiration for temporary data

Example operations from this project:

```javascript
await redis.set('greeting', 'Hello Redis');
const value = await redis.get('greeting');
```

## 17. Why use Redis with Express?

Express is a lightweight web framework, and Redis helps make APIs faster by caching repetitive data. Instead of repeatedly fetching from a database or third-party API, the app can serve cached results from Redis until they expire.

## 18. What are common Redis interview mistakes to avoid?

- treating Redis as a replacement for all databases
- ignoring TTLs and memory limits
- using huge values or unbounded keys
- assuming Pub/Sub is durable message storage
- storing sensitive data without encryption or ACL security

## 19. What security features does Redis provide?

Redis supports:

- password authentication
- ACL-based access control
- network restrictions and firewalls
- TLS support in newer deployments

For production systems, you should also use proper authentication and isolate Redis from public networks.

## 20. What are the most important Redis concepts to remember?

- in-memory speed
- TTL-based caching
- data structures beyond simple keys
- persistence options for durability
- memory management and eviction policies
- use cases such as caching, sessions, queueing, and messaging

## Quick summary

Redis is a high-performance in-memory data store widely used for caching, session management, real-time messaging, and lightweight data processing. In modern backend systems, Redis often complements SQL databases by improving performance, reducing database pressure, and enabling fast access to hot or frequently used data.

## Common Redis commands

```bash
SET key value
GET key
DEL key
EXPIRE key 60
HSET user:1 name "Alice" age 30
HGETALL user:1
LPUSH tasks "task1"
LRANGE tasks 0 -1
SADD tags "redis" "cache"
SMEMBERS tags
ZADD leaderboard 100 "alice"
ZRANGE leaderboard 0 -1 WITHSCORES
```

## Final interview tip

When answering Redis questions in an interview, explain both the theory and the practical use case. Good candidates connect Redis to real-world performance problems, memory management, TTLs, and system design decisions.
