const authUserMiddleware = require("../middlewares/authUserMiddleware");
const {
    addNewForm,
    getAllForms,
    deleteForm,
    getFormById,
} = require("../controllers/forms");

const router = require("express").Router();

// Unauth routes
router.get("/unauth/get/:id", getFormById); // For submiting applications

// Auth routes
router.get("/get/all", authUserMiddleware, getAllForms);
router.get("/get/:id", authUserMiddleware, getFormById); // For editing

router.post("/new", authUserMiddleware, addNewForm);

router.delete("/del/:id", authUserMiddleware, deleteForm);

module.exports = router;
