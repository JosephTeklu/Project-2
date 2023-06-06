const router = require("express").Router();
const { User, Url } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("homepage");
    return;
  }
  res.render("login");
});

module.exports = router;
