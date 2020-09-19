// const states = require("./states");
const axios = require("axios");

async function breweries(city, stateName) {
  const url = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + stateName + "&per_page=50";
  const res = await axios.get(url);
  //console.log(res.data);
 return res.data.filter(x => x.brewery_type !== 'planning' && x.latitude !== null);
}

module.exports = breweries;

