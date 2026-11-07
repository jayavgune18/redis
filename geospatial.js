const client = require("./client");

async function init() {
  const key = "cities";

  try {
    await client.geoadd(
      key,
      2.3522,
      48.8566,
      "Paris",
      -0.1276,
      51.5072,
      "London"
    );

    const positions = await client.geopos(key, "Paris", "London");
    console.log("City coordinates:", positions);

    const distance = await client.geodist(key, "Paris", "London", "km");
    console.log("Distance between Paris and London (km):", distance);

    const nearbyCities = await client.geosearch(
      key,
      "FROMMEMBER",
      "Paris",
      "BYRADIUS",
      350,
      "km",
      "WITHDIST",
      "ASC"
    );
    console.log("Cities within 350 km of Paris:", nearbyCities);
  } catch (error) {
    console.error("Geospatial example failed:", error);
    process.exitCode = 1;
  } finally {
    await client.quit();
  }
}

init();
