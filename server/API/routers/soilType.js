const express = require('express');
const router = express.Router();
const {
    getAllSoilTypes,
    createSoilType,
    getSoilById,
    getSoilByIdAndTitle,
    updateSoilType,
    deleteSoilType,
} = require('../controllers/soilType');

// GET all Soil types
router.route('/soil-type/')
    .get(getAllSoilTypes)
    .post(createSoilType);


router
    .route('/soil-type/:id')
    .get(getSoilById)
    .patch(updateSoilType)
    .delete(deleteSoilType)

router.get('/soil-type/:id/:slug', getSoilByIdAndTitle);

module.exports = router;
