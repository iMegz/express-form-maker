const router = require("express").Router();
const { getSub, getForms } = require("../controllers/stats");
const authUserMiddleware = require("../middlewares/authUserMiddleware");
const Form = require("../models/Form");
const Response = require("../models/Response");
const Subscription = require("../models/Subscription");

router.get("/get/sub", authUserMiddleware, getSub);

router.get("/get/forms", authUserMiddleware, getForms);

module.exports = router;
