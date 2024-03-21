const Insects = require('../models/Insects');
const slugify = require('slugify');
const Cultivation = require('../models/Cultivation');
const getAssociatedData = require('../lib/getAssociatedData');
const insectsAllData = require('../lib/getAllData');

// Get all insects
const getAllInsects = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;

    const allData = (insects) => ({
        _id: insects._id,
        images: insects.images,
        slug: insects.slug,
        title: insects.title,
        type: insects.type,
        solution: insects.solution,
        status: insects.status,
    });
    try {
        const allinsects = await insectsAllData(
            Insects,
            page,
            limit,
            allData
        );
        res.status(200).json(allinsects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new insect
const createInsect = async (req, res) => {
    const { images, title, type, solution } = req.body;
    let slug = slugify(title, { lower: true, replacement: '-', remove: /[^\w\s-]/g });
    const existingInsects = await Insects.findOne({ slug }).exec();

    if (existingInsects) {
        let count = 1;
        while (true) {
            const newSlug = `${slug}-${count}`;
            const checkInsects = await Insects.findOne({ slug: newSlug });
            if (!checkInsects) {
                slug = newSlug
                break;
            }
            count++;
        }
    }

    const insect = new Insects({
        images,
        slug,
        title,
        type,
        solution
    });

    try {
        const newInsect = await insect.save();
        res.status(201).json(newInsect);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single insect by ID
const getInsectById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const { id } = req.params;
        const insects = await Insects.findById(id);

        if (!insects) {
            return res.status(404).json({ message: 'Insects not found' });
        }

        const cultivation = await getAssociatedData(
            Cultivation,
            "insects",
            id,
            page,
            limit
        );

        res.status(200).json({ allData: insects, cultivation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single disease by ID and title
const getInsectByIdAndTitle = async (req, res) => {
    try {
        const { id, slug } = req.params;

        const insect = await Insects.findOne({ _id: id, slug });

        if (!insect) {
            return res.status(404).json({ message: 'Insects not found' });
        }

        res.status(200).json(insect);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update an insect
const updateInsect = async (req, res) => {
    const { id } = req.params;
    const { images, title, type, solution, status } = req.body;

    try {

        const insect = await Insects.findById(id);
        if (!insect) {
            return res.status(404).json({ message: 'insect not found' });
        }

        let imagesNew = images === null ? insect.images : images;
        let titleNew = title === null ? insect.title : title;
        let typeNew = type === null ? insect.type : type;
        let solutionNew = solution === null ? insect.solution : solution;
        let statusNew = status === null ? insect.status : status;

        const updateInsect = await Insects.findOneAndUpdate(
            { _id: id },
            {
                images: imagesNew,
                title: titleNew,
                type: typeNew,
                solution: solutionNew,
                status: statusNew
            },
            { new: true }
        )

        res.status(201).json({ updateInsect });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an insect
const deleteInsect = async (req, res) => {
    try {
        const { id } = req.params;

        const insect = await Insects.findByIdAndDelete(id);

        if (!insect) {
            return res.status(404).json({ message: 'Insect not found' });
        }

        res.json({ message: 'Insect deleted', insect });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllInsects,
    createInsect,
    getInsectById,
    getInsectByIdAndTitle,
    updateInsect,
    deleteInsect
};
