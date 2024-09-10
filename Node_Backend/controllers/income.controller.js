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

exports.getRecentIncomes = async (req, res, next) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ status: false, message: "Email is required", item: "" });
        }
        let recentIncomes = await IncomeServices.fetchRecentIncomes(email);
        if (recentIncomes.length > 0) {
            return res.status(200).json({status: true, item: recentIncomes});
        } else {
            return res.status(200).json({status: true, item: []});
        }
    } catch(error) {
        res.status(500).json({status: false, message: `Error while fetching recent incomes! ${error}`, item: ""});
    }
}

exports.getTotalIncomes = async (req,res,next) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ status: false, message: "Email is required" });
        }
        let amount = await IncomeServices.calculateTotalIncome(email);
        if(amount !== null) {
            return res.status(200).json({status: true, incamount: amount});
        } else {
            return res.status(200).json({status: true, incamount: 0});
        }
    } catch(error) {
        res.status(500).json({status: false, message: `Error while calculating total incomes! ${error}`});
    }
}