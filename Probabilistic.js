const client = require("./client");

async function init() {
  const filterKey = "filter:visited-users";
  const knownUser = "user:1001";
  const unknownUser = "user:2002";

  await client.call("BF.ADD", filterKey, knownUser);

  console.log(
    `${knownUser} may have visited:`,
    Boolean(await client.call("BF.EXISTS", filterKey, knownUser))
  );
  console.log(
    `${unknownUser} may have visited:`,
    Boolean(await client.call("BF.EXISTS", filterKey, unknownUser))
  );
}

init();
