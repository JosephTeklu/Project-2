const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form, with use of JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email-form").value.trim();
  const password = document.querySelector("#psswd-field").value.trim();

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
      var ress = await response.json();
      console.log(ress);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
