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

  require("./config/passport")(passport); // pass passport for configuration

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

  app.get("/profile", (req, res) => {
    db.collection("posts")
      .find()
      .toArray()
      .then((results) => {
        res.render("profile.ejs", { posts: results });
      });
  });

  app.post("/posts", (req, res) => {
    db.collection('activities').createIndex({ id: req.body.activityName },{ unique: true });

    console.log(req.body)
    db.collection("posts").save(req.body, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log("saved to database");
      res.redirect("/profile");
    });
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );
});


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions