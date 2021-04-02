const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.listen(3000, function () {
  app.use(bodyParser.urlencoded({ extended: true }));

  MongoClient.connect("mongodb-connection-string", (err, client) => {
    // ... do something here
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
