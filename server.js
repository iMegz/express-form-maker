if (process.env.NODE_ENV !== "production") require("dotenv").config();
const { join } = require("path");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
// const helmet = require("helmet").default;
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
});

// Middlewares
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const mgmtTokenMiddleware = require("./src/middlewares/mgmtTokenMiddleware");
const routes = require("./src/routes");
const db = require("./src/config/db");
const stripeWebhookMiddleware = require("./src/middlewares/stripeWebhookMiddleware");

// Managment API token for development
if (process.env.NODE_ENV !== "production") {
    global.token = process.env.DEV_MGMT_TOKEN;
}

// Initialize express app
const app = express();

app.enable("trust proxy");

// Stripe webhook middleware
app.post(
    "/api/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhookMiddleware
);

// Enable JSON parsing for incoming requests
app.use(express.json());

// Handle CORS headers
app.use(cors());

// Compress all routes
app.use(compression());

// Additional security
// app.use(helmet());

// Limit request rate
app.use(limiter);

// Serve static files located in the "public" directory.
app.use(express.static(join(__dirname, "public")));

// Get managment API token
app.use(mgmtTokenMiddleware);

// Testing route
app.get("/test", (req, res) => res.status(200).json({ status: "Success" }));

// Routes
app.use("/api", routes);

// 404 Route
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Error middleware
app.use(errorMiddleware);

// Start app
const PORT = process.env.PORT || 8080;
db(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
