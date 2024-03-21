// Api Routs
const express = require("express");
const router = express.Router();

// Import your API route modules
const {
    categories,
    cultivation,
    disease,
    insects,
    landType,
    season,
    soilType,
} = require("./");

// Use the imported route modules
router.use("/admin", categories);
router.use("/admin", cultivation);
router.use("/admin", disease);
router.use("/admin", insects);
router.use("/admin", landType);
router.use("/admin", season);
router.use("/admin", soilType);

module.exports = router;
