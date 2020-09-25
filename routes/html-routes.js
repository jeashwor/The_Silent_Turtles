// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const fs = require("fs");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const isAdmin = require("../config/middleware/isAdmin");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/nonMember", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mapmarker.html"));
  });

  app.get("/admin", isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    const data = fs.readFileSync(
      path.join(__dirname, "../public/members.html"),
      "utf8"
    );
    res.send(data.replace("{{memberZip}}", req.user.zipCode));
  });
};
