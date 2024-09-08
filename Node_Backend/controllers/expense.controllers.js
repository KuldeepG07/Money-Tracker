const ExpenseServices = require('../services/expense.services');

exports.createExpense = async (req, res, next) => {
    try {
        const {userId, categoryId, date, amount, description, payee, paymentMethod} = req.body;
        let expense = await ExpenseServices.createExpense(userId, categoryId, date, amount, description, payee, paymentMethod);
        res.status(200).json({status: true, item: expense});
    } catch(error) {
        res.status(500).json("Error while adding expense");
    }
}

exports.getRecentExpenses = async (req, res, next) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ status: false, message: "Email is required" });
        }
        let recentexpenses = await ExpenseServices.fetchRecentExpenses(email);
        if (recentexpenses.length > 0) {
            return res.status(200).json({status: true, item: recentexpenses});
        } else {
            return res.status(200).json({status: true, item: []});
        }
    } catch(error) {
        res.status(500).json({status: false, message: `Error while fetching recent expenses! ${error}`});
    }
}