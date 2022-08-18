const Transaction = require("../../models/transaction");
const { createError } = require("../../helpers");

const getAllTransactions = async (req, res) => {
  const owner = req.user._id;

  const transactions = await Transaction.find({
    owner,
  });
  if (!transactions) {
    throw createError(400, error.message);
  }
  res.status(201).json({
    message: "All transactions finded",
    transactions,
  });
};

module.exports = getAllTransactions;
