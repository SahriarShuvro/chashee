const express = require('express');
const router = express.Router();
const {
    getAllInsects,
    createInsect,
    getInsectById,
    getInsectByIdAndTitle,
    updateInsect,
    deleteInsect,
} = require('../controllers/insects');

// GET all insects
router
    .route('/insects')
    .get(getAllInsects)
    .post(createInsect);

// PATCH/update an insect
router
    .route('/insects/:id')
    .get(getInsectById)
    .patch(updateInsect)
    .delete(deleteInsect);

// DELETE an insect
router.get('/insects/:id/:slug', getInsectByIdAndTitle);

module.exports = router;
