const db = require("../../models");
// eslint-disable-next-line no-unused-vars
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
    );
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
}

module.exports = adminUpdate;
