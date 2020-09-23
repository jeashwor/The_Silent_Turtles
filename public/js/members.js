$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    console.log(data);
    $(".member-name").text(data.name);
  });
});

// const setUserZipCodeCenter = () => {
//   $.get("/api/user_data").then(user => {
//     memberZipCode = user.zipCode;
//     geocoder = new google.maps.GeoCoder();
//     gecoder.geocode({ address: memberZipCode }, (results, status) => {
//       if (status === google.maps.GeocoderStatus.OK) {
//         map.setCenter(results[0].geometry.location);
//       }
//     });
//   });
//  };

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(position => {
//     console.log(position.coords.latitude);
//     console.log(position.coords.longitude);
//     mapConfig.center = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };
//   });
// }
// map = new google.maps.Map(document.getElementById("map"), mapConfig);
