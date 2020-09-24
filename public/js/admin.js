$(document).ready(() => {
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
          "</td><td><button class='admin' data-id='" +
          user.id +
          "' admin-id='" +
          user.admin +
          "'>Admin</button></td><td><button class='delete' data-id='" +
          user.id +
          "'>Delete</button></td>"
      );
    });
  });

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
      // data: userVals
    }).then(window.location.reload());
  }

  $(document).on("click", ".delete", deleteUser);
  $(document).on("click", ".admin", updateUserAdmin);
});
