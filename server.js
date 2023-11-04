if (process.env.NODE_ENV !== "production") require("dotenv").config();
const { join } = require("path");
const express = require("express");
const cors = require("cors");

// Middlewares
const errorMiddleware = require("./middlewares/errorMiddleware");
const mgmtTokenMiddleware = require("./middlewares/mgmtTokenMiddleware");
const routes = require("./src/routes");

// Managment API token for development
if (process.env.NODE_ENV !== "production") {
    global.token = process.env.DEV_MGMT_TOKEN;
}

// Initialize express app
const app = express();

// Enable JSON parsing for incoming requests
app.use(express.json());

// Handle CORS headers
app.use(cors());

// Serve static files located in the "public" directory.
app.use(express.static(join(__dirname, "public")));

// Get managment API token
app.use(mgmtTokenMiddleware);

// Routes
app.use("/api", routes);

// Serve frontend react app
app.get("/", (req, res) => {
    res.status(200).send("Frontend");
});

// 404 Route
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Error middleware
app.use(errorMiddleware);

// Start app
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
