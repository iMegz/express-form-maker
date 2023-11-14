const router = require("express").Router();
const authUserMiddleware = require("../middlewares/authUserMiddleware");

router.post("/subscribe", authUserMiddleware);

module.exports = router;
