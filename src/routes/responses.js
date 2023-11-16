const {
    addNewResponse,
    getResponses,
    deleteResponse,
    getResponseById,
    getResponsesCount,
} = require("../controllers/responses");
const authUserMiddleware = require("../middlewares/authUserMiddleware");

const router = require("express").Router();

router.get("/form/:formId", authUserMiddleware, getResponses);
router.get("/:id", authUserMiddleware, getResponseById);
router.get("/count/:formId", getResponsesCount);

router.post("/", authUserMiddleware, addNewResponse);

router.delete("/:id", authUserMiddleware, deleteResponse);

module.exports = router;
