const client = require('./client');

async function runTransaction() {
  const key = 'transaction:demo:counter';
  const results = await client
    .multi()
    .set(key, 0)
    .incr(key)
    .get(key)
    .exec();

  for (const [error] of results) {
    if (error) {
      throw error;
    }
  }

  console.log('Transaction results:', results.map(([, result]) => result));
}

runTransaction()
  .catch((error) => {
    console.error('Transaction failed:', error);
    process.exitCode = 1;
  })
  .finally(() => client.quit());
