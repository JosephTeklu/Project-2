$(".signup-button").click(async function (event) {
  event.preventDefault();

  // grab the user's name, email and password
  const user_name = $("#name-signup").val();
  const email = $("#email-signup").val();
  const password = $("#password-signup").val();

  // if the fields are not blank make the new user
  if (user_name && email && password) {
    // make api call to login with given credentials
    const res = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({ user_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      document.location.replace("/");
    }
  } else {
    alert("Enter a valid field to signup!");
  }
});
