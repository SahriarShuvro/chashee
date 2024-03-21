const LandType = require('../models/LandType');
const slugify = require('slugify');
const Cultivation = require('../models/Cultivation');
const getAssociatedData = require('../lib/getAssociatedData');
const allLandData = require('../lib/getAllData');

// Get all land types
const getAllLandTypes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;

        const allData = (landType) => ({
            _id: landType._id,
            thumb: landType.thumb,
            slug: landType.slug,
            title: landType.title,
            status: landType.status,
        });
        const allLand = await allLandData(
            LandType,
            page,
            limit,
            allData
        );
        res.status(200).json(allLand);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new land type
const createLandType = async (req, res) => {
    const { thumb, title } = req.body;
    let slug = slugify(title, { lower: true, replacement: '-', remove: /[^\w\s-]/g });

    const existingLand = await LandType.findOne({ slug }).exec();

    if (existingLand) {
        let count = 1;
        while (true) {
            const newSlug = `${slug}-${count}`;
            const checkLand = await LandType.findOne({ slug: newSlug });
            if (!checkLand) {
                slug = newSlug
                break;
            }
            count++;
        }
    }

    const land = new LandType({
        thumb,
        slug,
        title
    });
    try {
        const newLand = await land.save();
        res.status(201).json(newLand);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Get a single land by ID
const getLandById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const { id } = req.params;
        const land = await LandType.findById(id);

        if (!land) {
            return res.status(404).json({ message: 'Land not found' });
        }

        const cultivation = await getAssociatedData(
            Cultivation,
            "land_type",
            id,
            page,
            limit
        );

        res.status(200).json({ allData: land, cultivation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single land by ID and title
const getLandByIdAndTitle = async (req, res) => {
    try {
        const { id, slug } = req.params;

        const land = await LandType.findOne({ _id: id, slug });

        if (!land) {
            return res.status(404).json({ message: 'Land not found' });
        }

        res.status(200).json(land);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a land type
const updateLandType = async (req, res) => {
    const { id } = req.params;
    const { thumb, title, status } = req.body;

    try {

        const land = await LandType.findById(id);
        if (!land) {
            return res.status(404).json({ message: 'Land not found' });
        }

        let thumbNew = thumb === null ? land.thumb : thumb;
        let titleNew = title === null ? land.title : title;
        let statusNew = status === null ? land.status : status;

        const updateLand = await LandType.findOneAndUpdate(
            { _id: id },
            {
                thumb: thumbNew,
                title: titleNew,
                status: statusNew
            },
            { new: true }
        )

        res.status(201).json({ updateLand });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a land type
const deleteLandType = async (req, res) => {
    try {
        const { id } = req.params;

        const land = await LandType.findByIdAndDelete(id);

        if (!land) {
            return res.status(404).json({ message: 'Land not found' });
        }

        res.json({ message: 'Land deleted', land });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLandTypes,
    createLandType,
    getLandById,
    getLandByIdAndTitle,
    updateLandType,
    deleteLandType
};
