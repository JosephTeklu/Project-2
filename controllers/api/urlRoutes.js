const router = require("express").Router();
const { User } = require("../../models");
const API_KEY = "6721d6bcd8msh0b47ff23771506fp18b93fjsncb79ec3722f5";

// const fetch = require("node-fetch");

router.get("/short", async (req, res) => {
	const encodedParams = new URLSearchParams()
	  .set(
	  "url",
	  "https://rapidapi.com/BigLobster/api/url-shortener-service"
	);
	
	const url = req.body.url;
	const options = {
	  method: "POST",
	  headers: {
		"content-type": "application/x-www-form-urlencoded",
		"X-RapidAPI-Key": "6721d6bcd8msh0b47ff23771506fp18b93fjsncb79ec3722f5",
		"X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
	  },
	  body: encodedParams,
	};
	
	try {
	  const response = await fetch(url, options);
	  const result = await response.text();
	  res.status(200).json(result);
	} catch (error) {
	  res.status(500).json(error);
	}
	});

});

// function getShortUrl(API_KEY, toSearch) {
//   // call the youtube api and search for the video given the query
//   fetch(
//     "https://www.googleapis.com/youtube/v3/search?key=" +
//       API_KEY +
//       "&type=video&part=snippet&q=" +
//       toSearch
//   )
//     .then(function (data) {
//       return data.json();
//     })
//     .then(function (data) {
//       // grab the video id
//       var videoID = data["items"][0]["id"]["videoId"];

//       // grab the id from the html
//       const iFrameElement = document.querySelector("#iFrameVideo");

//       // plug in the video with the embeded link
//       iFrameElement.src = `http://www.youtube.com/embed/${videoID}`;
//     });
// }

module.exports = router;
