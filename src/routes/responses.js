const {
    addNewResponse,
    getResponses,
    deleteResponse,
    getResponseById,
} = require("../controllers/responses");
const authUserMiddleware = require("../middlewares/authUserMiddleware");

const router = require("express").Router();

router.get("/get/all/:formId", authUserMiddleware, getResponses);
router.get("/get/:id", authUserMiddleware, getResponseById);

router.post("/new", authUserMiddleware, addNewResponse);

router.delete("/del/:id", authUserMiddleware, deleteResponse);

module.exports = router;
