const Transaction = require("../../models/transaction");
const { createError } = require("../../helpers");

const findAllTransactionsByDate = async (req, res) => {
  // ТУТ ТРЕБА ЗРОБИТИ ВАЛІДАЦІЮ
  // в дату має потрапляти наступний формат: yyyy-mm-dd

  const { date } = req.params;
  const dateArray = date.split("-");

  const { _id } = req.user;

  const result = await Transaction.find({
    owner: _id,
    year: dateArray[0],
    month: dateArray[1],
    day: dateArray[2],
  });
  // РЕЗАЛТ - МАСИВ ЗНАЙДЕНИХ ТРАНЗАКЦІЙ ВЛАСНИКА ЗА ПЕВНУ ДАТУ, ЯКЩО НЕМАЄ ТРАНЗАКЦІЙ - МАСИВ ПУСТИЙ
  res.status(200).json({
    message: "All transactions was finded",
    result,
  });
};

module.exports = findAllTransactionsByDate;
