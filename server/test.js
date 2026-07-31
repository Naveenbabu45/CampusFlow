require("dotenv").config();

console.log("URI =", process.env.MONGO_URI);

const { MongoClient } = require("mongodb");

async function test() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("✅ Connected successfully");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

test();