const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");


const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");


const { MONGO_URI } = require("./.env");
var db;


// configuration ===============================================================
mongoose.connect(MONGO_URI, (err, database) => {
  if (err) return console.log(err);
  db = database;
  require("./app/routes.js")(app, passport, db);
}); // connect to our database

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(
  session({
    secret: "secret", // session secret
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// launch ======================================================================
app.listen(port);
console.log("The magic happens on port " + port);
