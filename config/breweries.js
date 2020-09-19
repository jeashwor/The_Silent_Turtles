// const states = require("./states");
const axios = require("axios");

let city = "Atlanta";
let stateName = "Georgia";
let breweryList = [];
let breweryListObject = {};

function breweries() {
    const url = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + stateName;
    axios.get(url).then(function (res) {
        // console.log(res.data[0].name)
        res.data.map(function(res) {
            breweryListObject = {
                name: res.name,
                latitude: res.latitude,
                longitude: res.longitude
            }
            breweryList.push(breweryListObject);
        });
        console.log(breweryList);
    });
}

breweries();
