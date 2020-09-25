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
  const modalVal = $("#beerList");
  const favBeerList = $("#favoriteBeers");
  const favBeer = $(".favoriteBeers");

  const getBeerData = async () => {
    const beerData = {
      beerName: beerInput[0].value,
      breweryName: breweryName[0].innerHTML,
      user: userID
    };
    console.log(beerData.user);
    await $.post("/api/beer", {
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

  const getBeers = async () => {
    $.get("/api/beers/" + userID + "/" + breweryName[0].innerHTML, {
      id: userID,
      brewery: breweryName[0].innerHTML
    }).then(data => {
      favBeer.text("");
      if (favBeerList[0].hidden === true) {
        favBeerList[0].hidden = false;
        data.forEach(beers => {
          favBeer.append("<p>" + beers.beer_name + "</p>");
        });
      } else {
        data.forEach(beers => {
          favBeer.append("<p>" + beers.beer_name + "</p>");
        });
      }
    });
  };

  const assignBrewery = async id => {
    breweryName.text(id);
  };

  $(document).on("click", "#submitBtn", event => {
    event.preventDefault();
    getBeerData().then(modalVal.modal("toggle"));
  });

  $(document).on("click", ".beenThere", function(event) {
    event.preventDefault();
    console.log("clicked " + this.id + " brewery.");
    assignBrewery(this.id)
      .then(getBeers())
      .then(modalVal.modal());
  });
});
