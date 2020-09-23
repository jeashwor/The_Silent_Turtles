//Globals
let map, userLat, userLong;
// eslint-disable-next-line prefer-const
let markers = [];

const getMemberZip = () => {
  $.get("/api/user_data").then(user => {
    memberZipCode = user.zipCode;
    //alternatively, we use the zipcode API HERE (instead of in our route code)
    //then setCenter on the map
  });
};
let memberZipCode = getMemberZip();

// let nonMemberZipCode = $("#nonMemberZipCode").val();

async function breweries(city, stateName) {
  const url =
    "https://api.openbrewerydb.org/breweries?by_city=" +
    city +
    "&by_state=" +
    stateName +
    "&per_page=50";
  const res = await $.get(url);
  console.log(res);
  return res.filter(x => x.brewery_type !== "planning" && x.latitude !== null);
}

async function userZipCode(zipCode) {
  try {
    const url = "http://api.zippopotam.us/us/" + zipCode;
    const res = await $.get(url);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
$.getJSON("/data/states.json")
  .then(data => {
    states = data;
    return userZipCode(memberZip);
  })
  .then(res => {
    const state = res.places[0].state;
    const city = res.places[0]["place name"];
    userLong = parseFloat(res.places[0].longitude);
    console.log(userLong);
    userLat = parseFloat(res.places[0].latitude);
    console.log(userLat);
    return breweries(city, state);
  })
  .then(breweryList => {
    console.log(breweryList);
    //center map based on the zipCode we were given by the user
    //use breweryList to add map markers to our map
    breweryList.forEach(brewery => {
      const markerObj = {
        lat: brewery.latitude,
        lng: brewery.longitude
      };
      markers.push(markerObj);
    });
    console.log(markers);
  })
  .catch(err => console.log(err));

// eslint-disable-next-line no-unused-vars
function initMap() {
  const mapConfig = {};
  mapConfig.zoom = 15;
  if (!memberZip) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      mapConfig.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  } else if (memberZip) {
    console.log("user lat lng");
    console.log(userLat);
    console.log(userLong);
    mapConfig.center = {
      lat: userLat,
      lng: userLong
    };
    map = new google.maps.Map(document.getElementById("map"), mapConfig);
    markers.forEach(marker => {
      new google.maps.Marker({
        position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
        map: map
      });
    });
  }

  // else if (nonMemberZipCode) {

  // }
}
