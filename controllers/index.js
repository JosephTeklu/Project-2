const router = require("express").Router();

const apiRoutes = require("./api");
// home routes here

router.use("/api", apiRoutes);

module.exports = router;
