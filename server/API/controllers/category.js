const slugify = require('slugify');
const Category = require('../models/Category');
const Cultivation = require('../models/Cultivation');
const getAssociatedData = require('../lib/getAssociatedData');
const categoryAllData = require('../lib/getAllData');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const allData = (category) => ({
            _id: category._id,
            thumb: category.thumb,
            title: category.title,
            status: category.status,
        });
        const allCategory = await categoryAllData(
            Category,
            page,
            limit,
            allData
        );
        res.status(200).json(allCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    const { title, thumb } = req.body;
    let slug = slugify(title, { lower: true, replacement: '-', remove: /[^\w\s-]/g });

    // Check if the slug already exists
    const existingCategory = await Category.findOne({ slug }).exec();

    if (existingCategory) {
        let count = 1;
        while (true) {
            const newSlug = `${slug}-${count}`;
            const checkCategory = await Category.findOne({ slug: newSlug });
            if (!checkCategory) {
                slug = newSlug;
                break;
            }
            count++;
        }
    }

    const category = new Category({
        thumb,
        title,
        slug
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const cultivation = await getAssociatedData(
            Cultivation,
            "category",
            id,
            page,
            limit
        );

        res.status(200).json({ allData: category, cultivation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single category by ID and title
const getCategoryByIdAndTitle = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const { id, slug } = req.params;

        const category = await Category.findOne({ _id: id, slug });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const cultivation = await getAssociatedData(
            Cultivation,
            "category",
            id,
            page,
            limit
        );

        res.status(200).json({ allData: category, cultivation, slug });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { thumb, title, status } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (req.body.title != null) {
            category.title = req.body.title;
        }

        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id },
            { thumb, title, status },
            { new: true }
        );
        res.json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted', category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
    getCategoryByIdAndTitle,
    updateCategory,
    deleteCategory
};
