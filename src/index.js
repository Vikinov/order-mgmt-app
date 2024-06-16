const app = require("./app");
require("dotenv").config();
const logger = require("./logger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info("app listening on port 3000");
});
