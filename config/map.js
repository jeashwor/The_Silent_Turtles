const states = require("../states.json");
const userZipCode = require("./states.js");
const getBreweries = require("./breweries.js");

userZipCode("30114").then(function (res) {
    let stateCode = res.state;
    let city = res.city;
    let longitude = res.lng;
    let latitude = res.lat;
    let stateName;

    for (const key in states) {
        if (`${key}` === stateCode) {
            stateName = `${states[key]}`;
        }
    }
    getBreweries(city, stateName)
        .then(breweryList => console.log(breweryList)
        )
        .catch(err => console.log(err));
});
function initMap() {
    const map = new google.maps.Map(
        document.getElementById('map'), { zoom: 15, center: { lat: latitude, lng: longitude } });
    for (let i = 0; i < breweries.breweryList.length; i++) {
        marker = new google.maps.Marker({ position: { lat: breweries.breweryList[i].latitude, lng: breweries.breweryList[i].longitude }, map: map });
    }
}

/* <script defer
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBc4zOKsWDDNrNX567-_LsnKiOLabv9A3A&callback=initMap">
</script> THIS NEEDS TO BE ADDED TO THE HTML FILE THAT HOSTS THE MAP */
