const express = require("express");
const bodyParser = require("body-parser");
// Import Dependencies
const MongoClient = require("mongodb").MongoClient;

// Create cached connection variable
let cachedDb = null;

// A function for connecting to MongoDB,
// taking a single paramater of the connection string
async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db("kinect");

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("*", async (req, res) => {
  // const url = req.url.face_url;

  let happy = Math.floor(Math.random() * (35 - 15)) + 15;

  var db = await connectToDatabase(process.env.MONGO_URL);

  // Select the "users" collection from the database
  var collection = await db.collection("kinect");

  // Select the users collection from the database
  collection.updateOne(
    { name: "samuel" },
    {
      $set: {
        date: new Date(),
        happy: happy
      }
    },
    (err, data) => {
      if (err) {
        res.status(400).send({ happy });
      }
      res.status(200).send({ happy });
    }
  );
});

module.exports = app;
