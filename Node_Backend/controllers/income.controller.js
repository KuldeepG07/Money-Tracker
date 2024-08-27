const IncomeServices = require('../services/income.services');

exports.createIncome = async (req, res, next) => {
    try {
        const {userId, categoryId, date, amount, description, payer, paymentMethod} = req.body;
        let income = await IncomeServices.createIncome(userId, categoryId, date, amount, description, payer, paymentMethod);
        res.status(200).json({status: true, item: income});
    } catch(error) {
        res.status(500).json("Error while adding income");
    }
}