const Cultivation = require('../models/Cultivation');
const slugify = require('slugify');
const cultivationAllData = require('../lib/getAllData');


// Get all cultivations
const getAllCultivations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;

        const allData = (cultivation) => ({
            _id: cultivation._id,
            thumb: cultivation.thumb,
            slug: cultivation.slug,
            title: cultivation.title,
            category: cultivation.category,
            season: cultivation.season,
            land_type: cultivation.land_type,
            soil_type: cultivation.soil_type,
            sowing_time: cultivation.sowing_time,
            planting_time: cultivation.planting_time,
            seedling_amount: cultivation.seedling_amount,
            distance: cultivation.distance,
            fertilizers: cultivation.fertilizers,
            disease: cultivation.disease,
            insects: cultivation.insects,
            harvest_time: cultivation.harvest_time,
            crop_production: cultivation.crop_production,
            crop_prices: cultivation.crop_prices,
            cost: cultivation.cost,
            profit: cultivation.profit,
            status: cultivation.status,
        });
        const allCultivations = await cultivationAllData(
            Cultivation,
            page,
            limit,
            allData
        );
        res.status(200).json(allCultivations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new cultivation
const createCultivation = async (req, res) => {
    const {
        thumb,
        title,
        category,
        season,
        land_type,
        soil_type,
        sowing_time,
        planting_time,
        seedling_amount,
        distance,
        fertilizers,
        disease,
        insects,
        harvest_time,
        crop_production,
        crop_prices,
        cost,
        profit,
    } = req.body
    let slug = slugify(title, { lower: true, replacement: '-', remove: /[^\w\s-]/g });
    const existingCultivation = await Cultivation.findOne({ slug }).exec();
    if (existingCultivation) {
        let count = 1;
        while (true) {
            const newSlug = `${slug}-${count}`;
            const checkCultivation = await Cultivation.findOne({ slug: newSlug });
            if (!checkCultivation) {
                slug = newSlug
                break;
            }
            count++;
        }
    }
    const cultivation = new Cultivation({
        thumb,
        slug,
        title,
        category,
        season,
        land_type,
        soil_type,
        sowing_time,
        planting_time,
        seedling_amount,
        distance,
        fertilizers,
        disease,
        insects,
        harvest_time,
        crop_production,
        crop_prices,
        cost,
        profit,
    });

    try {
        const newCultivation = await cultivation.save();
        res.status(201).json(newCultivation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single disease by ID
const getCultivationById = async (req, res) => {
    try {
        const { id } = req.params;
        const cultivation = await Cultivation.findById(id);

        if (!cultivation) {
            return res.status(404).json({ message: 'Cultivation not found' });
        }

        res.status(200).json({ allData: cultivation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single disease by ID and title
const getCultivationByIdAndTitle = async (req, res) => {
    try {
        const { id, slug } = req.params;

        const cultivation = await Cultivation.findOne({ _id: id, slug });

        if (!cultivation) {
            return res.status(404).json({ message: 'Cultivation not found' });
        }

        res.status(200).json(cultivation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a cultivation
const updateCultivation = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            thumb,
            title,
            category,
            season,
            land_type,
            soil_type,
            sowing_time,
            planting_time,
            seedling_amount,
            distance,
            fertilizers,
            disease,
            insects,
            harvest_time,
            crop_production,
            crop_prices,
            cost,
            profit,
            status
        } = req.body

        const cultivation = await Cultivation.findById(id);
        if (!cultivation) {
            return res.status(404).json({ message: 'Cultivation not found' });
        }

        let thumbNew = thumb === null ? cultivation.thumb : thumb;
        let titleNew = title === null ? cultivation.title : title;
        let categoryNew = category === null ? cultivation.category : category;
        let seasonNew = season === null ? cultivation.season : season;
        let land_typeNew = land_type === null ? cultivation.land_type : land_type;
        let soil_typeNew = soil_type === null ? cultivation.soil_type : soil_type;
        let sowing_timeNew = sowing_time === null ? cultivation.sowing_time : sowing_time;
        let planting_timeNew = planting_time === null ? cultivation.planting_time : planting_time;
        let seedling_amountNew = seedling_amount === null ? cultivation.seedling_amount : seedling_amount;
        let distanceNew = distance === null ? cultivation.distance : distance;
        let fertilizersNew = fertilizers === null ? cultivation.fertilizers : fertilizers;
        let diseaseNew = disease === null ? cultivation.disease : disease;
        let insectsNew = insects === null ? cultivation.insects : insects;
        let harvest_timeNew = harvest_time === null ? cultivation.harvest_time : harvest_time;
        let crop_productionNew = crop_production === null ? cultivation.crop_production : crop_production;
        let crop_pricesNew = crop_prices === null ? cultivation.crop_prices : crop_prices;
        let costNew = cost === null ? cultivation.cost : cost;
        let profitNew = profit === null ? cultivation.profit : profit;
        let statusNew = status === null ? cultivation.status : status;


        const updateCultivation = await Cultivation.findOneAndUpdate(
            { _id: id },
            {
                thumb: thumbNew,
                title: titleNew,
                category: categoryNew,
                season: seasonNew,
                land_type: land_typeNew,
                soil_type: soil_typeNew,
                sowing_time: sowing_timeNew,
                planting_time: planting_timeNew,
                seedling_amount: seedling_amountNew,
                distance: distanceNew,
                fertilizers: fertilizersNew,
                disease: diseaseNew,
                insects: insectsNew,
                harvest_time: harvest_timeNew,
                crop_production: crop_productionNew,
                crop_prices: crop_pricesNew,
                cost: costNew,
                profit: profitNew,
                status: statusNew
            },
            { new: true }
        )

        res.json(updateCultivation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a cultivation
const deleteCultivation = async (req, res) => {
    try {
        const cultivation = await Cultivation.findByIdAndDelete(req.params.id);
        if (!cultivation) {
            return res.status(404).json({ message: 'Cultivation not found' });
        }

        res.json({ message: 'Cultivation deleted', cultivation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCultivations,
    createCultivation,
    getCultivationById,
    getCultivationByIdAndTitle,
    updateCultivation,
    deleteCultivation
};
