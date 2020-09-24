//Globals
let map, userLong, userLat, userZip;
// eslint-disable-next-line prefer-const
let markers = [];
// eslint-disable-next-line prefer-const
let userVals = [];
let highestZIndex = 0;

async function getMemberZip() {
  $.get("/api/user_data").then(user => {
    memberZip = user.zipCode;
    return memberZip;
  });
}

$("#brewButton").click(event => {
  event.preventDefault();
  $("#breweries").empty(); // clears out the li elements
  markers = []; // deletes the old markers when user types in a new ZipCode
  userVals = []; // this allows the map to relocate to the newly entered ZipCode
  const nonMemberZipCode = $("#nonMemberZipCode").val();
  memberZip = nonMemberZipCode;
  userZipCode(nonMemberZipCode).then(gatherData());
  $("#nonMemberZipCode").val("");
});

async function breweries(city, stateName) {
  const url =
    "https://api.openbrewerydb.org/breweries?by_city=" +
    city +
    "&by_state=" +
    stateName +
    "&per_page=50";
  const res = await $.get(url);
  return res.filter(x => x.brewery_type !== "planning" && x.latitude !== null);
}

async function userZipCode(zipCode) {
  try {
    const url = "http://api.zippopotam.us/us/" + zipCode;
    const res = await $.get(url);
    userLong = parseFloat(res.places[0].longitude);
    userLat = parseFloat(res.places[0].latitude);
    userZip = parseInt(res["post code"]);
    userVals.push(userLong, userLat, userZip);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function gatherData() {
  getMemberZip().then(
    userZipCode(memberZip)
      .then(res => {
        const state = res.places[0].state;
        const city = res.places[0]["place name"];
        return breweries(city, state);
      })
      .then(breweryList => {
        breweryList.forEach(brewery => {
          $("#breweries").append("<li> " + brewery.name + "</li>");
          const text = "Been there?";
          $("#breweries").append(
            "<button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#beerList'>" +
              text +
              "</button> <br>"
          );
          const markerObj = {
            lat: brewery.latitude,
            lng: brewery.longitude,
            name: brewery.name,
            url: brewery.website_url
          };
          markers.push(markerObj);
        });
        newInitMap(userVals);
      })
      .catch(err => console.log(err))
  );
}

function newInitMap(userVals) {
  const mapConfig = {};
  mapConfig.zoom = 11;
  if (!userVals) {
    navigator.geolocation.getCurrentPosition(position => {
      mapConfig.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  } else if (userVals[2]) {
    mapConfig.center = {
      lat: userVals[1],
      lng: userVals[0]
    };
    map = new google.maps.Map(document.getElementById("map"), mapConfig);
    let i = 0;
    markers.forEach(brewery => {
      marker = new google.maps.Marker({
        position: {
          lat: parseFloat(brewery.lat),
          lng: parseFloat(brewery.lng)
        },
        label: {
          text: brewery.name,
          color: "black",
          fontWeight: "bold"
        },
        icon: {
          labelOrigin: new google.maps.Point(11, 60),
          url: "./assets/beerIcon.png",
          scaledSize: new google.maps.Size(35, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(11, 40)
        },
        optimized: false,
        zIndex: i,
        url: brewery.url,
        map: map
      });
      i++;
      highestZIndex++;
      markers.push(marker);
      marker.set("myZIndex", marker.getZIndex());
      google.maps.event.addListener(marker, "mouseover", function() {
        this.setOptions({ zIndex: highestZIndex + 1 });
      });
      google.maps.event.addListener(marker, "mouseout", function() {
        this.setOptions({ zIndex: this.get("myZIndex") });
      });
      google.maps.event.addListener(marker, "click", function() {
        window.open(this.url);
      });
    });
  }
  // else if (nonMemberZipCode) {

  // }
}

// eslint-disable-next-line no-unused-vars
async function worthAShot(userVals) {
  gatherData();
}
