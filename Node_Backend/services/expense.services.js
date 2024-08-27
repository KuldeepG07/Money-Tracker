const ExpenseModel = require('../models/expenses.model');

class ExpenseServices {
    
    static async createExpense (userId, categoryId, date, amount, description, payee, paymentMethod) {
        const createExpense = new ExpenseModel({userId, categoryId, date, amount, description, payee, paymentMethod});
        return await createExpense.save();
    }
}

module.exports = ExpenseServices;