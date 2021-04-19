module.exports = function (app, passport, db) {
  
  app.get("/", (req, res) => {
      console.log(db.collection("posts"))
    db.collection("posts")
      .find()
      .toArray()
      .then((results) => {
        res.render("index.ejs", { posts: results });
      });
  });
 
  app.get("/profile", isLoggedIn, (req, res) => {
    db.collection("posts")
      .find()
      .toArray()
      .then((results) => {
        res.render("profile.ejs", { posts: results });
      });
  });

  app.post("/posts", (req, res) => {
    db.collection("posts").insertOne(req.body, (err, result) => {
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
    res.render("login.ejs");
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
    res.render("signup.ejs");
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
};

//If not logged in redirect to "/"

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}
