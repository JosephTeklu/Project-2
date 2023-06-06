const router = require("express").Router();

const apiRoutes = require("./api");
// home routes here
const homeRoutes= require("./homeRoutes");

router.use("/api", apiRoutes);
router.use('/', homeRoutes);
module.exports = router;
