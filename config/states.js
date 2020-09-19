const axios = require("axios");

async function userZipCode(zipCode) {
  const clientKey =
    "Ez9Rro9HCYnywWiEiSljGWM9oO69YSKFWh58p0WjAL1CBhEjIo7FsDGesuor38Ev";
  const url =
    "https://www.zipcodeapi.com/rest/" +
    clientKey +
    "/info.json/" +
    zipCode +
    "/radians"; // need to pass in user input
    const res = await axios.get(url);
        return res.data;
    };


module.exports = userZipCode
