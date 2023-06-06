const router = require("express").Router();
const { User, Url } = require("../models");
const withAuth = require("../utils/auth");


router.get('/', async (req,res) => {
    res.render('homepage', {{User}});
});

module.exports = router;