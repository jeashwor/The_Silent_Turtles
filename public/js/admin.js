$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
  });

  $.get("/api/admin").then(data => {
    console.log(data);
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
          "</td>"
      );
    });
    // $("#userList")
  });
});
