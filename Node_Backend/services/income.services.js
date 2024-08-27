const IncomeModel = require('../models/incomes.model');

class IncomeServices {
    
    static async createIncome (userId, categoryId, date, amount, description, payer, paymentMethod) {
        const createIncome = new IncomeModel({userId, categoryId, date, amount, description, payer, paymentMethod});
        return await createIncome.save();
    }
}

module.exports = IncomeServices;