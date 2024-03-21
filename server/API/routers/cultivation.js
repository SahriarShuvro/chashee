const express = require('express');
const router = express.Router();
const {
    getAllCultivations,
    createCultivation,
    getCultivationById,
    getCultivationByIdAndTitle,
    updateCultivation,
    deleteCultivation
} = require('../controllers/cultivation');

// GET all cultivations
router
    .route('/cultivation/')
    .get(getAllCultivations)
    .post(createCultivation);


// PATCH/update a cultivation
router
    .route('/cultivation/:id')
    .get(getCultivationById)
    .patch(updateCultivation)
    .delete(deleteCultivation);

// DELETE a cultivation
router.get('/cultivation/:id/:slug', getCultivationByIdAndTitle);

module.exports = router;
