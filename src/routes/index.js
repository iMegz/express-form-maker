const router = require("express").Router();

const formsRouter = require("./forms");
const responsesRouter = require("./responses");

router.use("/forms", formsRouter);
router.use("/response", responsesRouter);

module.exports = router;
