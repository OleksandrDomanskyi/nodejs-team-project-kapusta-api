const Transaction = require("../../models/transaction");
const Joi = require("joi");
const { createError } = require("../../helpers");

const deleteTransactionSchema = Joi.object({
  id: Joi.string().required(),
});

const deleteTransaction = async (req, res) => {
  deleteTransactionSchema.validate(req.params);
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
