// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// const axios = require("axios");
// const states = require("../states.json");

module.exports = function (app) {
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
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
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
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
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

  async function adminUpdate(id, adminVal) {
    console.log(adminVal);
    if (adminVal === "true") {
      console.log("running if false statement");
      await db.User.update(
        {
          admin: false
        },
        {
          where: {
            id: id
          }
        }
      )
    } else {
      console.log("running if true statement");
      await db.User.update(
        {
          admin: true
        },
        {
          where: {
            id: id
          }
        }
      );
    }
  };

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
