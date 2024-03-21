const getAllData = async (model, page, limit, decodeData) => {
    try {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < (await model.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        results.results = await model
            .find()
            .sort({ createdAt: "desc" })
            .limit(limit)
            .skip(startIndex)
            .exec();
        // Count total number of items in the collection
        const totalItems = await model.countDocuments();
        // Calculate total number of pages
        const totalPages = Math.ceil(totalItems / limit);

        // Count total number of active items
        const totalActiveItems = await model.countDocuments({
            status: true,
        });

        // Count total number of inactive items
        const totalInactiveItems = totalItems - totalActiveItems;

        let allPost = results.results.map(decodeData);
        const activePosts = await model.find({ status: true })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();


        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        return {

            pagination: {
                totalEntries: totalItems,
                totalPages,
                currentPage: page,
                hasNextPage,
                hasPrevPage,
                activeItems: totalActiveItems,
                inactiveItems: totalInactiveItems,
            },
            entries: allPost,
            activePosts
        };
    } catch (error) {
        console.error(error);
    }
};

module.exports = getAllData;

