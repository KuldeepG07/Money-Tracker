const CategoryModel = require('../models/categories.model');

class CategoryServices {

    static async getAllCategories ()  {
        try {
            const categories = await CategoryModel.find();
            return categories;
        } catch(error) {
            next(error);
        }
    }
}

module.exports = CategoryServices;