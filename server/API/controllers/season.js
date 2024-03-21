const Season = require('../models/Season');
const slugify = require('slugify');
const Cultivation = require('../models/Cultivation');
const getAssociatedData = require('../lib/getAssociatedData');
const allSeasonData = require('../lib/getAllData');

// Get all season types
const getAllSeasons = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;

        const allData = (season) => ({
            _id: season._id,
            thumb: season.thumb,
            slug: season.slug,
            duration: season.duration,
            title: season.title,
            status: season.status,
        });
        const allSeason = await allSeasonData(
            Season,
            page,
            limit,
            allData
        );
        res.status(200).json(allSeason);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new soil type
const createSeason = async (req, res) => {
    const { thumb, title, duration } = req.body;
    let slug = slugify(title, { lower: true, replacement: '-', remove: /[^\w\s-]/g });

    const existingSeason = await Season.findOne({ slug }).exec();

    if (existingSeason) {
        let count = 1;
        while (true) {
            const newSlug = `${slug}-${count}`;
            const checkSeason = await Season.findOne({ slug: newSlug });
            if (!checkSeason) {
                slug = newSlug
                break;
            }
            count++;
        }
    }

    const season = new Season({
        thumb,
        slug,
        title,
        duration
    });
    try {
        const newSeason = await season.save();
        res.status(201).json(newSeason);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Get a single season by ID
const getSeasonById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const { id } = req.params;
        const season = await Season.findById(id);

        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }

        const cultivation = await getAssociatedData(
            Cultivation,
            "season",
            id,
            page,
            limit
        );

        res.status(200).json({ allData: season, cultivation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single season by ID and title
const getSeasonByIdAndTitle = async (req, res) => {
    try {
        const { id, slug } = req.params;

        const season = await Season.findOne({ _id: id, slug });

        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }

        res.status(200).json(season);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a season type
const updateSeason = async (req, res) => {
    const { id } = req.params;
    const { thumb, title, duration, status } = req.body;

    try {

        const season = await Season.findById(id);
        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }

        let thumbNew = thumb === null ? season.thumb : thumb;
        let titleNew = title === null ? season.title : title;
        let durationNew = duration === null ? season.duration : duration;
        let statusNew = status === null ? season.status : status;

        const updateSeason = await Season.findOneAndUpdate(
            { _id: id },
            {
                thumb: thumbNew,
                title: titleNew,
                duration: durationNew,
                status: statusNew
            },
            { new: true }
        )

        res.status(201).json({ updateSeason });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a season type
const deleteSeason = async (req, res) => {
    try {
        const { id } = req.params;

        const season = await Season.findByIdAndDelete(id);

        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }

        res.json({ message: 'Season deleted', season });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSeasons,
    createSeason,
    getSeasonById,
    getSeasonByIdAndTitle,
    updateSeason,
    deleteSeason,
};
