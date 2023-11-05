const router = require("express").Router();
const authUserMiddleware = require("../middlewares/authUserMiddleware");
const {
    addNewForm,
    getAllForms,
    deleteForm,
    getFormById,
    editForm,
} = require("../controllers/forms");

// Unauth routes
router.get("/unauth/get/:id", getFormById); // For submiting applications

// Auth routes
router.get("/get/all", authUserMiddleware, getAllForms);
router.get("/get/:id", authUserMiddleware, getFormById); // For editing

router.post("/new", authUserMiddleware, addNewForm);

router.patch("/edit/:id", authUserMiddleware, editForm);

router.delete("/del/:id", authUserMiddleware, deleteForm);

module.exports = router;
