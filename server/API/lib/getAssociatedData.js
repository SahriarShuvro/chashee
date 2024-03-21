const getAssociatedData = async (
    Model,
    foreignKey,
    foreignKeyValue,
    page,
    limit
) => {
    try {

        const startIndex = (page - 1) * limit;

        // Count total entries where the foreign key matches the provided value
        const totalEntries = await Model.countDocuments({
            [foreignKey]: foreignKeyValue,
            status: true,
        });

        const totalPages = Math.ceil(totalEntries / limit);

        // Find all entries where the foreign key matches the provided value with pagination
        const entries = await Model.find({
            [foreignKey]: foreignKeyValue,
            status: true,
        })
            .limit(limit)
            .skip(startIndex);

        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return {
            pagination: {
                totalEntries,
                totalPages,
                currentPage: page,
                hasNextPage,
                hasPrevPage,
                nextPage: hasNextPage ? page + 1 : null,
                prevPage: hasPrevPage ? page - 1 : null,
            },
            entries,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

module.exports = getAssociatedData;
