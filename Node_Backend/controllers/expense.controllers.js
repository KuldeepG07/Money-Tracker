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