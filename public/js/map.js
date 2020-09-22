//Globals
let states, userLat, userLong, nonMemberZipCode, memberZipCode;
const markers = [];

const getMemberZip = () => {
  $.get("/api/user_data").then(user => {
    memberZipCode = user.zipCode;
  });
};
memberZipCode = getMemberZip();

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
    const clientKey =
      "js-372sPZt0JF7Jk43Lovlab0Ejmn9eTiZ7VycR1it9VrC5U1IIZCP5Kuvde8gwLZXx";
    const url =
      "https://www.zipcodeapi.com/rest/" +
      clientKey +
      "/info.json/" +
      zipCode +
      "/radians"; // need to pass in user input
    const res = await $.get(url);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
$.getJSON("/data/states.json")
  .then(data => {
    states = data;
    return userZipCode(memberZipCode);
  })
  .then(res => {
    console.log(res);
    const stateCode = res.state;
    const city = res.city;
    userLong = res.lng;
    userLat = res.lat;
    let stateName;

    for (const key in states) {
      if (`${key}` === stateCode) {
        stateName = `${states[key]}`;
      }
    }
    return breweries(city, stateName);
  })
  .then(breweryList => {
    console.log(breweryList);
    //center map based on the zipCode we were given by the user
    //use breweryList to add map markers to our map
    breweryList.forEach(brewery => {
      const markerObj = {
        position: {
          lat: brewery.latitude,
          lng: brewery.longitude
        }
      };
      markers.push(markerObj);
    });
    console.log(markers);
  })
  .catch(err => console.log(err));

// eslint-disable-next-line no-unused-vars
function initMap(memberZipCode, nonMemberZipCode, markers, userLat, userLong) {
  const mapConfig = {};
  mapConfig.zoom = 15;
  let map;

      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: {
            lat: -34.397,
            lng: 150.644
          },
          zoom: 8
        });
      }
  // if (!memberZipCode && !nonMemberZipCode) {
  //   console.log("getting by geolocation");
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log(position.coords.latitude);
  //     mapConfig.center = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     map = new google.maps.Map(document.getElementById("map"), mapConfig);
  //   });
  // } else if (memberZipCode) {
  //   console.log("using memberZip");
  //   mapConfig.center = {
  //     lat: userLat,
  //     lng: userLong
  //   };
  //   markers.forEach(marker => {
  //     new google.maps.Marker({
  //       position: { lat: marker.lat, lng: marker.lng },
  //       map: map
  //     });
  //   });
  // }

  // else if (nonMemberZipCode) {

  // }
}
