const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const { MongoServerSelectionError } = require("mongodb");
const app = express();
//environment variables
const {MONGO_URI} = require("./.env");
var db





app.listen(3000, function () {
  app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }).then((client) => {
  console.log("Connected to Database");
  db = client.db("pandemicHobbies");
  const postsCollection = db.collection("posts");

});


  app.get("/", (req, res) => {
    const cursor = db.collection("posts").find();
    console.log(cursor);
    res.sendFile(__dirname + "/index.html");
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  });

  app.post("/posts", (req, res) => {
    db.collection('posts').save(req.body, (err, result) => {
      if (err){ return console.log(err)}
      console.log('saved to database')
      res.redirect('/')  })
  });
});
