const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById,
    getCategoryByIdAndTitle,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/category');

// GET all categories
router
    .route('/categories')
    .get(getAllCategories)
    .post(createCategory);

// GET a single category by ID
router
    .route('/categories/:id')
    .get(getCategoryById)
    .patch(updateCategory)
    .delete(deleteCategory);

// GET a single category by ID and title
router.get('/categories/:id/:slug', getCategoryByIdAndTitle);




module.exports = router;