const Transaction = require("../../models/transaction");
const { createError } = require("../../helpers");

const createTransation = async (req, res, next) => {
  try {
    // ТУТ ТРЕБА ЗРОБИТИ ВАЛІДАЦІЮ

    const { _id } = req.user;
    const { type, category, value, date } = req.body;
    const result = await Transaction.create({
      owner: _id,
      type,
      category,
      value,
      date,
    });
    if (!result) {
      throw createError(400, error.message);
    }
    // ТУТ ТРЕБА ЗРОБИТИ ВИКЛИК ФУНКЦІЇ НА ОНОВЛЕННЯ БАЛАНСУ ПРИ СТВОРЕННІ ТРАНЗАКЦІЇ
    res.status(201).json({
      message: "Transaction created",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createTransation;
