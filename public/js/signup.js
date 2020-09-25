$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const userNameInput = $("input#userName");
  const emailInput = $("input#emailInput");
  const passwordInput = $("input#passwordInput");
  const zipCodeInput = $("input#zipCode");
  const favBreweryTypeInput = $("select#favBreweryType");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      userName: userNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      zipCode: zipCodeInput.val().trim(),
      favBreweryType: favBreweryTypeInput.val().trim()
    };

    if (
      !userData.userName ||
      !userData.email ||
      !userData.password ||
      !userData.zipCode
    ) {
      return;
    }
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    userNameInput.val("");
    zipCodeInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", {
      name: userData.userName,
      email: userData.email,
      password: userData.password,
      zipCode: userData.zipCode,
      favBreweryType: userData.favBreweryType
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr() {
    $("#alert .msg").text("Please enter a valid United States Zip Code");
    $("#alert").fadeIn(500);
  }
});
