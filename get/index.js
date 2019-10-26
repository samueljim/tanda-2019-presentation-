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

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  //   console.log(process.env.MONGO_URL);
  var db = await connectToDatabase(process.env.MONGO_URL);

  // Select the "users" collection from the database
  var collection = await db.collection("kinect");

  //   console.log(query);

  res.setHeader("Content-Type", "application/json");

  //   res.end(
  //     JSON.stringify({ happy: Math.floor(Math.random() * (40 - 20 + 1) + 20) })
  //   );
  // Select the users collection from the database
  var item = {};
  collection.findOne(item, (err, result) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: true,
          msg: "i'm uncomfortable sharing that info with you"
        })
      );
    } else {
      if (result) {
        let happy = Math.floor(Math.random() * (35 - 15)) + 15;

        res.end(JSON.stringify({ happy: happy }));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: true,
            msg: "what are you looking for? it's not here"
          })
        );
      }
    }
  });
};
