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
}

module.exports = ExpenseServices;