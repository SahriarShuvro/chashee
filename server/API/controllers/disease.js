const Disease = require('../models/Disease');
const slugify = require('slugify');
const Cultivation = require('../models/Cultivation');
const getAssociatedData = require('../lib/getAssociatedData');
const diseaseAllData = require('../lib/getAllData');

// Get all diseases
const getAllDiseases = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;

        const allData = (disease) => ({
            _id: disease._id,
            images: disease.images,
            slug: disease.slug,
            title: disease.title,
            type: disease.type,
            solution: disease.solution,
            status: disease.status,
        });
        const allDisease = await diseaseAllData(
            Disease,
            page,
            limit,
            allData
        );
        res.status(200).json(allDisease);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new disease
const createDisease = async (req, res) => {
    const { images, title, type, solution } = req.body;
    let slug = slugify(title, { lower: true, replacement: '-', remove: /[^\w\s-]/g });

    const existingDisease = await Disease.findOne({ slug }).exec();

    if (existingDisease) {
        let count = 1;
        while (true) {
            const newSlug = `${slug}-${count}`;
            const checkDisease = await Disease.findOne({ slug: newSlug });
            if (!checkDisease) {
                slug = newSlug
                break;
            }
            count++;
        }
    }

    const disease = new Disease({
        images,
        slug,
        title,
        type,
        solution
    });
    try {
        const newDisease = await disease.save();
        res.status(201).json(newDisease);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Get a single disease by ID
const getDiseaseById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const { id } = req.params;
        const disease = await Disease.findById(id);

        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }

        const cultivation = await getAssociatedData(
            Cultivation,
            "disease",
            id,
            page,
            limit
        );

        res.status(200).json({ allData: disease, cultivation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single disease by ID and title
const getDiseaseByIdAndTitle = async (req, res) => {
    try {
        const { id, slug } = req.params;

        const disease = await Disease.findOne({ _id: id, slug });

        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }

        res.status(200).json(disease);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a disease
const updateDisease = async (req, res) => {
    const { id } = req.params;
    const { images, title, type, solution, status } = req.body;

    try {

        const disease = await Disease.findById(id);
        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }

        let imagesNew = images === null ? disease.images : images;
        let titleNew = title === null ? disease.title : title;
        let typeNew = type === null ? disease.type : type;
        let solutionNew = solution === null ? disease.solution : solution;
        let statusNew = status === null ? disease.status : status;

        const updateDisease = await Disease.findOneAndUpdate(
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

        res.status(201).json({ updateDisease });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Delete a disease
const deleteDisease = async (req, res) => {
    try {
        const { id } = req.params;

        const disease = await Disease.findByIdAndDelete(id);

        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }

        res.json({ message: 'Disease deleted', disease });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDiseases,
    getDiseaseById,
    getDiseaseByIdAndTitle,
    createDisease,
    updateDisease,
    deleteDisease
};
