const express = require('express');
const router = express.Router();
const {
    getAllSeasons,
    createSeason,
    getSeasonById,
    getSeasonByIdAndTitle,
    updateSeason,
    deleteSeason,
} = require('../controllers/season');

// GET all Season types
router.route('/season')
    .get(getAllSeasons)
    .post(createSeason);


router
    .route('/season/:id')
    .get(getSeasonById)
    .patch(updateSeason)
    .delete(deleteSeason)

router.get('/season/:id/:slug', getSeasonByIdAndTitle);

module.exports = router;
