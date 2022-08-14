const Transaction = require("../../models/transaction");
const { createError } = require("../../helpers");

const createTransation = async (req, res) => {
  // ТУТ ТРЕБА ЗРОБИТИ ВАЛІДАЦІЮ
  const owner = req.user._id;
  const { type, value, category, date } = req.body;
  const normalizedDate = new Date(date);
  const day = normalizedDate.getDate();
  const month = normalizedDate.getMonth() + 1;
  const year = normalizedDate.getFullYear();

  const result = await Transaction.create({
    type,
    value,
    category,
    date,
    day,
    month,
    year,
    owner,
  });
  if (!result) {
    throw createError(400, error.message);
  }
  res.status(201).json({
    message: "Transaction created",
    result,
  });
};

module.exports = createTransation;
