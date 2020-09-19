//Globals
let map;
let states;

async function breweries(city, stateName) {
  const url =
    "https://api.openbrewerydb.org/breweries?by_city=" +
    city +
    "&by_state=" +
    stateName +
    "&per_page=50";
  const res = await $.get(url);
  //console.log(res.data);
  return res.data.filter(
    x => x.brewery_type !== "planning" && x.latitude !== null
  );
}

async function userZipCode(zipCode) {
  try {
    const clientKey =
      "Ez9Rro9HCYnywWiEiSljGWM9oO69YSKFWh58p0WjAL1CBhEjIo7FsDGesuor38Ev";
    const url =
      "https://www.zipcodeapi.com/rest/" +
      clientKey +
      "/info.json/" +
      zipCode +
      "/radians"; // need to pass in user input
    const res = await $.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
$.getJSON("/data/states.json")
  .then(data => {
    states = data;
    return userZipCode("30114");
  })
  .then(res => {
    console.log(res);
    const stateCode = res.state;
    const city = res.city;
    const longitude = res.lng;
    const latitude = res.lat;
    let stateName;

    for (const key in states) {
      if (`${key}` === stateCode) {
        stateName = `${states[key]}`;
      }
    }
    return getBreweries(city, stateName);
  })
  .then(breweryList => {
    console.log(breweryList);
    console.log(longitude);
    console.log(latitude);
    //center map based on the zipCode we were given by the user

    //use breweryList to add map markers to our map
  })
  .catch(err => console.log(err));

// eslint-disable-next-line no-unused-vars
function initMap() {
  const mapConfig = {};
  mapConfig.zoom = 15;
  // mapConfig.center = {lat: -34.397, lng: 150.644}
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude);
      mapConfig.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map = new google.maps.Map(document.getElementById("map"), mapConfig);
    });
  }
  // for (let i = 0; i < breweries.breweryList.length; i++) {
  //   marker = new google.maps.Marker({
  //     position: {
  //       lat: breweries.breweryList[i].latitude,
  //       lng: breweries.breweryList[i].longitude
  //     },
  //     map: map
  //   });
  // }
}

/* <script defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBc4zOKsWDDNrNX567-_LsnKiOLabv9A3A&callback=initMap">
  </script> THIS NEEDS TO BE ADDED TO THE HTML FILE THAT HOSTS THE MAP */
