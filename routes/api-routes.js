// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const adminUpdate = require("../config/middleware/adminUpdate");
// const axios = require("axios");
// const states = require("../states.json");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user.
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode,
      favoriteBreweryType: req.body.favBreweryType
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        res.status(401).json(err);
      });
  });

  // Route for creating beer in DB from user input.
  app.post("/api/beer", (req, res) => {
    console.log(req.body);
    userIdVal = parseInt(req.body.userId);
    console.log(userIdVal);
    db.Beer.create({
      beer_name: req.body.beerName,
      brewery: req.body.brewery,
      UserId: userIdVal
    })
      .then(() => {
        console.log("beer added to DB");
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        res.status(401).json(err);
      });
  });

  // Route for getting beers based on user id
  app.get("/api/beers/:id/:brewery", (req, res) => {
    db.Beer.findAll({
      where: {
        UserId: req.params.id,
        brewery: req.params.brewery
      }
    }).then(beers => {
      res.json(beers);
    });
  });

  // Route for getting all users for admin display
  app.get("/api/admin", (req, res) => {
    db.User.findAll({}).then(dbUsers => {
      res.json(dbUsers);
    });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        name: req.user.name,
        id: req.user.id,
        zipCode: req.user.zipCode,
        admin: req.user.admin,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      });
    }
  });

  // Route for deleting user on admin page
  app.delete("/api/admin/:id", (req, res) => {
    console.log(req.params.id);
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbUsers => {
      res.json(dbUsers);
    });
  });

  // Route for changing admin value of user.
  app.put("/api/admin/:id/:admin", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    console.log(req.params.admin);
    const adminVal = req.params.admin;
    adminUpdate(id, adminVal).then(dbUsers => {
      res.json(dbUsers);
    });
  });
};
