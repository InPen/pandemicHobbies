const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const { MongoServerSelectionError } = require("mongodb");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
//environment variables
const {MONGO_URI} = require("./.env");
var db





app.listen(3000, function () {
  app.use(bodyParser.urlencoded({ extended: true }));

  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }).then(
    (client) => {
      console.log("Connected to Database");
      db = client.db("pandemicHobbies");
      const postsCollection = db.collection("posts");
    }
  );

  require('./config/passport')(passport); // pass passport for configuration


  // tells express to render the public folder
  app.use(express.static("public"));
  
  app.get("/", (req, res) => {
    db.collection("posts")
      .find()
      .toArray()
      .then((results) => {
        res.render("index.ejs", { posts: results });
      });
  });

  app.post("/posts", (req, res) => {
    db.collection("posts").save(req.body, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log("saved to database");
      res.redirect("/");
    });
  });
});


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions