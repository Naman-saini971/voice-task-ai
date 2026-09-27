require("dotenv").config();

const { MongoClient } = require("mongodb");

async function test() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

test();