const CategoryServices = require('../services/category.services');

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryServices.getAllCategories();
        if (categories.length > 0) {
            return res.status(200).json({status: true, categories: categories});
        }
        else {
            return res.status(200).json({status: true, categories: []});
        }
    } catch (error) {
        res.status(500).json({status: false, message: `Error while fetching categories: ${error}` });
    }
}