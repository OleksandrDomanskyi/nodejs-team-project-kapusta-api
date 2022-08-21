const Transaction = require("../../models/transaction");
const Joi = require("joi");
const { createError } = require("../../helpers");

const createTransactionSchema = Joi.object({
  type: Joi.string().valid("income", "expenses").required(),
  value: Joi.number().required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  description: Joi.string().required(),
});

const createTransation = async (req, res) => {
  const { error } = createTransactionSchema.validate(req.body.transaction);
  if (error) {
    throw createError(400, error.message);
  }
  const owner = req.user._id;
  const { type, value, category, date, description } = req.body.transaction;

  const normalizedDate = new Date(date);
  const day = String(normalizedDate.getDate()).padStart(2, 0);
  const month = String(normalizedDate.getMonth() + 1).padStart(2, 0);
  const year = normalizedDate.getFullYear();

  const result = await Transaction.create({
    type,
    value,
    category,
    description,
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
