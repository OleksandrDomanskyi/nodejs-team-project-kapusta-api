const Transaction = require("../../models/transaction");
const { createError } = require("../../helpers");

const deleteTransaction = async (req, res) => {
  // ТУТ ТРЕБА ЗРОБИТИ ВАЛІДАЦІЮ

  const { id } = req.params;
  const result = await Transaction.findByIdAndDelete({
    _id: id,
  });
  if (!result) {
    throw createError(404, "Transaction ID not found");
  }

  res.status(200).json({
    message: "transaction deleted",
  });
};

module.exports = deleteTransaction;
