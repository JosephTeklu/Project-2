const router = require("express").Router();
const userRoutes = require("./userRoutes");
const urlRoutes = require("./urlRoutes");

router.use("/user", userRoutes);
// router.use("/url", urlRoutes);

module.exports = router;
