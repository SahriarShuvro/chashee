const express = require('express');
const router = express.Router();
const {
    getAllDiseases,
    getDiseaseById,
    getDiseaseByIdAndTitle,
    createDisease,
    updateDisease,
    deleteDisease
} = require('../controllers/disease');

// GET all diseases
router
    .route('/diseases')
    .get(getAllDiseases)
    .post(createDisease);

// GET a single disease by ID
router
    .route('/diseases/:id')
    .get(getDiseaseById)
    .patch(updateDisease)
    .delete(deleteDisease);

// GET a single disease by ID and title
router.get('/diseases/:id/:slug', getDiseaseByIdAndTitle);

module.exports = router;
