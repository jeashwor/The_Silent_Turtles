const states = require("./states.js")

function initMap() {
  const reformation = { lat: 34.2351928, lng: -84.4953245 };
  const sweetwater = { lat: 33.80802235, lng: -84.3810721937623};

    const map = new google.maps.Map(
    $('#map'), { zoom: 15, center: reformation });

    const marker = new google.maps.Marker({ position: reformation, map: map });
    const marker2 = new google.maps.Marker({ position: sweetwater, map: map };
}

// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBc4zOKsWDDNrNX567-_LsnKiOLabv9A3A&callback=initMap">
