const ExpenseModel = require('../models/expenses.model');
const UserModel = require('../models/user.model');

class ExpenseServices {
    
    static async createExpense (userId, categoryId, date, amount, description, payee, paymentMethod) {
        const createExpense = new ExpenseModel({userId, categoryId, date, amount, description, payee, paymentMethod});
        return await createExpense.save();
    }
    static async fetchRecentExpenses(email) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const userId = user._id;
        return await ExpenseModel.find({ userId }).sort({ date: -1 }).limit(5);
    }
    static async calculateTotalExpense(email) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const userId = user._id;
        const totalExpense = await ExpenseModel.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        return totalExpense.length>0 ? totalExpense[0].totalAmount : 0;   
    }
}

module.exports = ExpenseServices;