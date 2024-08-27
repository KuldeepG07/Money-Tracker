const CategoryServices = require('../services/category.services');

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryServices.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}