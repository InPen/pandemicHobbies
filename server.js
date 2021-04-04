const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const { MongoServerSelectionError } = require("mongodb");
const app = express();
//environment variables
const {MONGO_URI} = require("./.env");


//database connection




app.listen(3000, function () {
  app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }).then((client) => {
  console.log("Connected to Database");
  const db = client.db("pandemicHobbies");
});


  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  });

  app.post("/posts", (req, res) => {
    console.log("Hellooooooooooooooooo!");
  });
});
