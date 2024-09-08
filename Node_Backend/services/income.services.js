const IncomeModel = require('../models/incomes.model');
const UserModel = require('../models/user.model');

class IncomeServices {
    
    static async createIncome (userId, categoryId, date, amount, description, payer, paymentMethod) {
        const createIncome = new IncomeModel({userId, categoryId, date, amount, description, payer, paymentMethod});
        return await createIncome.save();
    }

    static async fetchRecentIncomes(email) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const userId = user._id;
        return await IncomeModel.find({ userId }).sort({ date: -1 }).limit(5);
    }
}

module.exports = IncomeServices;