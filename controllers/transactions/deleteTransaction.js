const Transaction = require("../../models/transaction");
const User = require("../../models/user");
const { createError } = require("../../helpers");

const deleteTransaction = async (req, res, next) => {
  try {
    // ТУТ ТРЕБА ЗРОБИТИ ВАЛІДАЦІЮ
    const { _id, balance } = req.user;

    const { id } = req.params;
    const { type, value } = await Transaction.findById({ _id: id });
    const result = await Transaction.findByIdAndDelete({
      _id: id,
    });
    if (!result) {
      throw createError(404, "Transaction ID not found");
    }

    // UPDATE BALANCE - ТРЕБА ВИНЕСТИ В ОКРЕМУ ФУНКЦІЮ
    let newBalance = +balance;
    type === "income" ? (newBalance += +value) : (newBalance -= +value);

    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      { balance: newBalance },
      { returnDocument: "after" }
    );
    ///////////////////////////////////////////////////////

    res.status(200).json({
      message: "transaction deleted",
      balance: updatedUser.balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteTransaction;
