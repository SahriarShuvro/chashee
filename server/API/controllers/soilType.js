const SoilType = require('../models/SoilType');
const slugify = require('slugify');
const Cultivation = require('../models/Cultivation');
const getAssociatedData = require('../lib/getAssociatedData');
const allSoilData = require('../lib/getAllData');

// Get all soil types
const getAllSoilTypes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;

        const allData = (soil) => ({
            _id: soil._id,
            thumb: soil.thumb,
            slug: soil.slug,
            title: soil.title,
            status: soil.status,
        });
        const allSoil = await allSoilData(
            SoilType,
            page,
            limit,
            allData
        );
        res.status(200).json(allSoil);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new soil type
const createSoilType = async (req, res) => {
    const { thumb, title } = req.body;
    let slug = slugify(title, { lower: true, replacement: '-', remove: /[^\w\s-]/g });

    const existingSoil = await SoilType.findOne({ slug }).exec();

    if (existingSoil) {
        let count = 1;
        while (true) {
            const newSlug = `${slug}-${count}`;
            const checkSoil = await SoilType.findOne({ slug: newSlug });
            if (!checkSoil) {
                slug = newSlug
                break;
            }
            count++;
        }
    }

    const soil = new SoilType({
        thumb,
        slug,
        title
    });
    try {
        const newSoil = await soil.save();
        res.status(201).json(newSoil);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Get a single soil by ID
const getSoilById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const { id } = req.params;
        const soil = await SoilType.findById(id);

        if (!soil) {
            return res.status(404).json({ message: 'Soil not found' });
        }

        const cultivation = await getAssociatedData(
            Cultivation,
            "soil_type",
            id,
            page,
            limit
        );

        res.status(200).json({ allData: soil, cultivation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single soil by ID and title
const getSoilByIdAndTitle = async (req, res) => {
    try {
        const { id, slug } = req.params;

        const soil = await SoilType.findOne({ _id: id, slug });

        if (!soil) {
            return res.status(404).json({ message: 'Soil not found' });
        }

        res.status(200).json(soil);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a soil type
const updateSoilType = async (req, res) => {
    const { id } = req.params;
    const { thumb, title, status } = req.body;

    try {

        const soil = await SoilType.findById(id);
        if (!soil) {
            return res.status(404).json({ message: 'Soil not found' });
        }

        let thumbNew = thumb === null ? soil.thumb : thumb;
        let titleNew = title === null ? soil.title : title;
        let statusNew = status === null ? soil.status : status;

        const updateSoil = await SoilType.findOneAndUpdate(
            { _id: id },
            {
                thumb: thumbNew,
                title: titleNew,
                status: statusNew
            },
            { new: true }
        )

        res.status(201).json({ updateSoil });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a soil type
const deleteSoilType = async (req, res) => {
    try {
        const { id } = req.params;

        const soil = await SoilType.findByIdAndDelete(id);

        if (!soil) {
            return res.status(404).json({ message: 'Soil not found' });
        }

        res.json({ message: 'Soil deleted', soil });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSoilTypes,
    createSoilType,
    getSoilById,
    getSoilByIdAndTitle,
    updateSoilType,
    deleteSoilType
};
