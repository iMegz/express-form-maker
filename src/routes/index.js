const router = require("express").Router();

const formsRouter = require("./forms");

router.use("/forms", formsRouter);

module.exports = router;
