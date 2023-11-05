const { addNewResponse } = require("../controllers/responses");

const router = require("express").Router();

router.post("/new", addNewResponse);

module.exports = router;
