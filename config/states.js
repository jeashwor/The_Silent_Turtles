const states = require("../states.json");
const axios = require("axios");

let city,
    longitude,
    latitude,
    stateCode,
    stateName;

function userZipCode(zipCode) {
  const clientKey =
    "Ez9Rro9HCYnywWiEiSljGWM9oO69YSKFWh58p0WjAL1CBhEjIo7FsDGesuor38Ev";
  const url =
    "https://www.zipcodeapi.com/rest/" +
    clientKey +
    "/info.json/" +
    zipCode +
    "/radians"; // need to pass in user input
    axios.get(url).then(function (res) {
        console.log(res.data);
        stateCode = res.data.state;
        city = res.data.city;
        longitude = res.data.lng;
        latitude = res.data.lat;
    }).then(function (res) {
        for (const key in states) {
            if (`${key}` === stateCode) {
                stateName = `${states[key]}`;
            }
        }
    });
}
