// const newFormHandler = async (event) => {
//   event.preventDefault();
//   const url = document.querySelector("#url").value.trim();
// };

// if (url) {
//   const response = await fetch(`/api/urlRoutes`, {
//     method: "POST",
//     body: JSON.stringify({ url }),
//   });
//   console.log(`URL: ${url}`);
//   if (response.ok) {
//     document.location.replace("/nameofhandlebars");
//   } else {
//     alert("Failed to create shorten Url");
//   }
// }
// const deleteButtonHandler = async (event) => {
//   if (event.target.hasAttribute("url_id")) {
//     const id = event.target.getAttribute("url_id");

//     const response = await fetch(`/api/urlRoutes/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/nameofhandlebars");
//     } else {
//       alert("Failed to delete url");
//     }
//   }
// };

// document
//   .querySelector(".new-url-form")
//   .addEventListener("submit", newFormHandler);

// document
//   .querySelector(".url-list")
//   .addEventListener("click", deleteButtonHandler);

$(".shorten-button").click(async function (event) {
  event.preventDefault();

  const url = $("#url").val();
  console.log(`LONG URL ${url}`);

  if (url) {
    const res = await fetch("/api/url/", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      console.log(res);
      let data = await res.json();
      console.log(data.result_url);

      document.getElementById("shortUrl").textContent = data.result_url;
    }
  } else {
    alert("Enter a valid url!");
  }
});
