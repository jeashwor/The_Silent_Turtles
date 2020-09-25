$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
  });
});

const beerInput = $("#beerInput");
const breweryName = $(".breweryName");

$("#submitBtn").on("click", event => {
  event.preventDefault();
  const beerData = {
    beerName: beerInput[0].value,
    breweryName: breweryName[0].innerHTML
  };
  $.post("/api/beer", {
    beerName: beerData.beerName,
    brewery: beerData.breweryName
  })
    .then(() => {
      console.log("Is this working?");
      getBeers();
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});
