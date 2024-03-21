// Import your API route modules
const categories = require("./category");
const cultivation = require("./cultivation");
const disease = require("./disease");
const insects = require("./insects");
const landType = require("./landType");
const season = require("./season");
const soilType = require("./soilType");

module.exports = {
    categories,
    cultivation,
    disease,
    insects,
    landType,
    season,
    soilType,
};
