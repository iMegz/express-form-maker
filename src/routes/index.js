const router = require("express").Router();

const formsRouter = require("./forms");
const responsesRouter = require("./responses");
const statsRouter = require("./stats");

router.use("/forms", formsRouter);
router.use("/response", responsesRouter);
router.use("/stats", statsRouter);

module.exports = router;
