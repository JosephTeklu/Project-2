const router = require("express").Router();
const { Url } = require("../../models");

const withAuth = require("../../utils/auth");
const url = "https://url-shortener-service.p.rapidapi.com/shorten";

const options = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": process.env.APIKEY,
    "X-RapidAPI-Host": process.env.APIHOST,
  },
  body: new URLSearchParams({
    url: "https://google.com",
  }),
};

//add new url
router.get("/", async (req, res) => {
  try {
    userUrl = "https://facebook.com";
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
    //save url
    req.session.save(() => {
      req.session.url_id = newUrl.id;
      res.status(200).json(result);
      console.log(result);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    userUrl = "https://bing.com";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.APIKEY,
        "X-RapidAPI-Host": process.env.APIHOST,
      },
      body: new URLSearchParams({
        url: req.body,
      }),
    };
    const newUrl = await fetch(url, options);
    const result = await newUrl.text(req.body);

    req.session.save(() => {
      req.session.url_id = newUrl.id;
      res.status(200).json(result);
      console.log(result);
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
