# Easy Redis Interview Questions and Answers

Short answers for a quick review before an interview.

## 1. What is Redis?

Redis is a fast data store that keeps data in memory. It is often used to cache data so an application can read it quickly.

## 2. Why is Redis fast?

Redis keeps data in memory (RAM), so it can access data faster than a disk-based database in many common use cases.

## 3. What is caching?

Caching means temporarily saving frequently used data so the application does not need to fetch or calculate it again each time.

## 4. How does an application use Redis as a cache?

The application checks Redis first. If the data is there, it returns it. If not, it gets the data from the original source, saves a copy in Redis, and returns it.

## 5. What does TTL mean?

TTL means **Time To Live**. It is how long a Redis key should exist before it expires.

```bash
SET greeting "Hello"
EXPIRE greeting 60
```

Here, `greeting` expires after 60 seconds.

## 6. What kinds of data can Redis store?

- **String**: simple values, counters, or text
- **Hash**: fields grouped together, like a user profile
- **List**: ordered values
- **Set**: unique values
- **Sorted set**: unique values ordered by a score

## 7. What is the difference between a list and a set?

A list keeps values in order and can contain duplicates. A set contains unique values and is useful for checking whether an item exists.

## 8. What is a Redis hash?

A hash stores related fields under one key. For example, `user:1` could have a `name` field and an `email` field.

```bash
HSET user:1 name "Alex" email "alex@example.com"
HGETALL user:1
```

## 9. What is a sorted set used for?

A sorted set stores unique values with scores. It is useful for things like a game leaderboard, where players are ordered by score.

## 10. Is Redis a replacement for a SQL database?

Usually, no. Redis is great for fast access to temporary or frequently used data. A SQL database is generally better for long-term structured data and complex queries. Many applications use both.

## 11. Does Redis keep data after it restarts?

Redis can save data to disk using persistence options such as RDB snapshots and AOF logs. Whether data is saved, and how often, depends on its configuration.

## 12. What is Redis Pub/Sub?

Pub/Sub lets one application publish a message to a channel and other applications listen for it. It is useful for real-time updates, but messages are not stored for subscribers that are offline.

## 13. How can Redis help a Node.js application?

Node.js applications commonly use Redis to cache API results, store sessions, or share temporary data between application instances. This project uses `ioredis` to connect to Redis and demonstrates caching and data structures.

## 14. What should you remember when using Redis?

- Give temporary data an appropriate TTL.
- Keep an eye on memory usage.
- Do not assume cached data is always up to date.
- Protect Redis with suitable network and access controls.

## Useful commands

```bash
SET greeting "Hello"
GET greeting
DEL greeting
EXPIRE greeting 60
HSET user:1 name "Alex"
HGETALL user:1
LPUSH tasks "task1"
SADD tags "redis"
ZADD leaderboard 100 "Alex"
```

## Quick answer to practice

**“What is Redis used for?”**

> Redis is a fast in-memory data store. I can use it to cache frequently requested data, which can make an application faster and reduce repeated requests to a database or API. I would use an expiration time when the cached data should only be kept temporarily.
