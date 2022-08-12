const Transaction = require("../../models/transaction");
const User = require("../../models/user");
const { createError } = require("../../helpers");

const createTransation = async (req, res, next) => {
  try {
    // ТУТ ТРЕБА ЗРОБИТИ ВАЛІДАЦІЮ
    // РОЗРОБИТИ ЛОГІКУ ЯК ЗБЕРІГАТИ ДАТУ

    const { _id, balance } = req.user;
    const { type, category, value, year, month, day } = req.body;
    const result = await Transaction.create({
      owner: _id,
      type,
      category,
      value,
      year,
      month,
      day,
    });
    if (!result) {
      throw createError(400, error.message);
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

    res.status(201).json({
      message: "Transaction created",
      result,
      balance: updatedUser.balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createTransation;
