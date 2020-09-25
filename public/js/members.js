$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // eslint-disable-next-line no-unused-vars
  let userID;

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
    return (userID = data.id);
  });

  const beerInput = $("#beerInput");
  const breweryName = $(".breweryName");

  const getBeerData = () => {
    const beerData = {
      beerName: beerInput[0].value,
      breweryName: breweryName[0].innerHTML,
      user: userID
    };
    console.log(beerData.user);
    $.post("/api/beer", {
      beerName: beerData.beerName,
      brewery: beerData.breweryName,
      userId: beerData.user
    })
      .then(() => {
        console.log("Is this working?");
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  };

  $("#submitBtn").on("click", event => {
    event.preventDefault();
    getBeerData();
  });
});

const getBeers = () => {
  $.get("/api/beerlist").then(data => {
    if ($("#favoriteBeers")[0].hidden === true) {
      $("#favoriteBeers")[0].hidden = false;
      data.forEach(beers => {
        $(".favoriteBeers").append("<p>" + beers + "</p>");
      });
    } else {
      data.forEach(beers => {
        $(".favoriteBeers").append("<p>" + beers + "</p>");
      });
    }
  });
};
