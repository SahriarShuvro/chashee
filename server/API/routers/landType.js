const express = require('express');
const router = express.Router();
const {
    getAllLandTypes,
    createLandType,
    getLandById,
    getLandByIdAndTitle,
    updateLandType,
    deleteLandType,
} = require('../controllers/landType');

// GET all land types
router.route('/land-type/')
    .get(getAllLandTypes)
    .post(createLandType);


router
    .route('/land-type/:id')
    .get(getLandById)
    .patch(updateLandType)
    .delete(deleteLandType)

// DELETE a land type
router.get('/land-type/:id/:slug', getLandByIdAndTitle);

module.exports = router;
