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
    console.log(req.user);
    const data = fs.readFileSync(
      path.join(__dirname, "../public/members.html"),
      "utf8"
    );
    //this route can use req.user.zipCode to make an axios call to our zipcode api and get lat/lng
    //.then(data => {
    //res.send(data.replace("{{memberLat}}", latFromAPI).replace("memberLng", lngFromAPI));
    //})
    // .catch(err => {
    //don't replace the data. If we don't replace, we need to check on the front end
    //to see if the placeholders still exist and use navigator.geolocation to center the map instead
    // })

    res.send(data.replace("{{memberZip}}", req.user.zipCode));
  });
};
