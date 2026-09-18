const client = require("./client");

async function init() {

const res1 = await client.zAdd('racer_scores', { score: 10, value: 'Norem' });
console.log(res1);  // >>> 1

const res2 = await client.zAdd('racer_scores', { score: 12, value: 'Castilla' });
console.log(res2);  // >>> 1

const res3 = await client.zAdd('racer_scores', [
  { score: 8, value: 'Sam-Bodden' },
  { score: 10, value: 'Royce' },
  { score: 6, value: 'Ford' },
  { score: 14, value: 'Prickett' },
  { score: 12, value: 'Castilla' }
]);
console.log(res3); // >>> 4 

}

init();

