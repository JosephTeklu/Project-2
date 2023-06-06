const router = require("express").Router();
const { json } = require("express");
const { Url } = require("../../models");

const withAuth = require("../../utils/auth");
const url = "https://url-shortener-service.p.rapidapi.com/shorten";

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": process.env.APIKEY,
//     "X-RapidAPI-Host": process.env.APIHOST,
//   },
//   body: new URLSearchParams({
//     url: "https://google.com",
//   }),
// };

//add new url
// router.get("/", async (req, res) => {
//   try {
//     let userUrl = req.url;
//     console.log(req);
//     console.log(`LONG URL: ${userUrl}`);
//     console.log(`URL: ${userUrl}`);
//     const options = {
//       method: "POST",
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         "X-RapidAPI-Key": process.env.APIKEY,
//         "X-RapidAPI-Host": process.env.APIHOST,
//       },
//       body: new URLSearchParams({
//         url: userUrl,
//       }),
//     };
//     const newUrl = await fetch(url, options);
//     console.log(`SHORT URL: ${newUrl}`);
//     const result = await newUrl.text(req.body);
//     //save url
//     req.session.save(() => {
//       req.session.url_id = newUrl.id;
//       res.status(200).json(newUrl);
//       console.log(`short url: ${this.toString(result.body.result_url)}`);
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.post("/", async (req, res) => {
  try {
    let userUrl = req.body.url;
    console.log(`LONG URL: ${userUrl}`);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.APIKEY,
        "X-RapidAPI-Host": process.env.APIHOST,
      },
      body: new URLSearchParams({
        url: userUrl,
      }),
    };
    const newUrl = await fetch(url, options);
    const result = await newUrl.text(req.body);

    console.log(typeof result);
    let data = JSON.parse(result);

    req.session.save(() => {
      req.session.url_id = newUrl.id;
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    await Url.destroy(req.body);
    req.session.save(() => {
      res.status(200).json();
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
