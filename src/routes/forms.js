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
router.get("/unauth/:id", getFormById); // For submiting applications

// Auth routes
router.get("/", authUserMiddleware, getAllForms);
router.get("/:id", authUserMiddleware, getFormById); // For editing

router.post("/", authUserMiddleware, addNewForm);

router.patch("/:id", authUserMiddleware, editForm);

router.delete("/:id", authUserMiddleware, deleteForm);

module.exports = router;
