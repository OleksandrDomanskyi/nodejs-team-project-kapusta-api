const Transaction = require("../../models/transaction");
const { createError } = require("../../helpers");

const findAllTransactionsByDate = async (req, res, next) => {
  try {
    // ТУТ ТРЕБА ЗРОБИТИ ВАЛІДАЦІЮ
    const { date } = req.params;
    const { _id } = req.user;
    const result = await Transaction.find({
      owner: _id,
      date,
    });
    // РЕЗАЛТ - МАСИВ ЗНАЙДЕНИХ ТРАНЗАКЦІЙ ВЛАСНИКА ЗА ПЕВНУ ДАТУ, ЯКЩО НЕМАЄ ТРАНЗАКЦІЙ - МАСИВ ПУСТИЙ
    res.status(200).json({
      message: "All transactions was finded",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findAllTransactionsByDate;
