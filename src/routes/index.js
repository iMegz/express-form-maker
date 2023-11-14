const router = require("express").Router();

const formsRouter = require("./forms");
const responsesRouter = require("./responses");
const statsRouter = require("./stats");
const subscriptionRouter = require("./subscription");

router.use("/forms", formsRouter);
router.use("/response", responsesRouter);
router.use("/stats", statsRouter);
router.use("/subscription", subscriptionRouter);

module.exports = router;
