const Transaction = require("../../models/transaction");
const { createError } = require("../../helpers");

const findAllTransactionsByDate = async (req, res) => {
  // ТУТ ТРЕБА ЗРОБИТИ ВАЛІДАЦІЮ
  // в дату має потрапляти наступний формат: yyyy-mm-dd

  const { date } = req.params;
  const result = await Transaction.find({
    owner: req.user._id,
    date,
  });

  res.status(200).json({
    message: "All transactions was finded",
    result,
  });
};

module.exports = findAllTransactionsByDate;
