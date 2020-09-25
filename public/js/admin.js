$(document).ready(() => {
  const favBeer = $(".favoriteBeers");
  const userSelected = $(".userSelected");

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
  });

  $.get("/api/admin").then(data => {
    data.forEach(user => {
      $("#userList").append(
        "<tr><td>" +
          user.id +
          "</td><td>" +
          user.name +
          "</td><td>" +
          user.email +
          "</td><td>" +
          user.zipCode +
          "</td><td>" +
          user.favoriteBreweryType +
          "</td><td>" +
          user.admin +
          "</td><td>" +
          user.createdAt +
          "</td><td>" +
          user.updatedAt +
          "</td><td><button class='btn btn-primary beer' data-id='" +
          user.id +
          "' data-name='" +
          user.name +
          "'>Beers</button></td><td><button class='btn btn-warning admin' data-id='" +
          user.id +
          "' admin-id='" +
          user.admin +
          "'>Admin</button></td><td><button class='btn btn-danger delete' data-id='" +
          user.id +
          "'>Delete</button></td>"
      );
    });
  });

  function showBeerList(event) {
    event.preventDefault();
    const id = $(this).data("id");
    const user = $(this).data("name");
    $.ajax({
      method: "GET",
      url: "/api/beers/" + id
    }).then(data => {
      console.log(data);
      favBeer.text("");
      userSelected.text("");
      if (data.length === 0) {
        userSelected.text(user);
        favBeer.append("<li>" + user + " has not logged any beers</li>");
        console.log("no beers to list");
      } else {
        userSelected.text(user);
        data.forEach(beers => {
          favBeer.append(
            "<li>" + beers.beer_name + " from " + beers.brewery + "</li>"
          );
          console.log(beers.beer_name + " added to list");
        });
      }
    });
  }

  function deleteUser(event) {
    event.preventDefault();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/admin/" + id
    }).then(window.location.reload());
  }

  function updateUserAdmin(event) {
    event.preventDefault();
    const id = $(this).data("id");
    const adminVal = $(this).attr("admin-id");
    $.ajax({
      method: "PUT",
      url: "/api/admin/" + id + "/" + adminVal
    }).then(window.location.reload());
  }

  $(document).on("click", ".delete", deleteUser);
  $(document).on("click", ".admin", updateUserAdmin);
  $(document).on("click", ".beer", showBeerList);
});
