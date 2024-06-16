const express = require("express");
const router = express.Router();
const user = require("./user");
const menu = require("./menu");
const cart = require("./cart");
const order = require("./order");
const authenticationMiddleware = require("../auth/authenticationMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");

router.get("/", (req, res) => {
    res.status(200).send("App is running using express router");
});

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use("/api/v1.0/user", user);
router.use("/api/v1.0/menu", authenticationMiddleware, menu);
router.use("/api/v1.0/cart", authenticationMiddleware, cart);
router.use("/api/v1.0/order", authenticationMiddleware, order);

module.exports = router;