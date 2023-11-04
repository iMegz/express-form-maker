const authUserMiddleware = require("../middlewares/authUserMiddleware");
const { addNewForm, getAllForms, deleteForm } = require("../controllers/forms");

const router = require("express").Router();

router.get("/get/all", authUserMiddleware, getAllForms);

router.post("/new", authUserMiddleware, addNewForm);

router.delete("/del/:id", authUserMiddleware, deleteForm);

module.exports = router;
