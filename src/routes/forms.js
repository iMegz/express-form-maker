const authUserMiddleware = require("../../middlewares/authUserMiddleware");
const { addNewForm } = require("../controllers/forms");

const router = require("express").Router();

router.post("/new", authUserMiddleware, addNewForm);

module.exports = router;
