const router = require("express").Router();
const { subscribe } = require("../controllers/subscription");
const authUserMiddleware = require("../middlewares/authUserMiddleware");

router.post("/subscribe", authUserMiddleware, subscribe);

module.exports = router;
