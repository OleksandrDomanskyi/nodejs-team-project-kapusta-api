const Transaction = require("../../models/transaction");
const Joi = require("joi");
const { createError } = require("../../helpers");

const findAllTransactionsByDateSchema = Joi.object({
  periodId: Joi.string().min(4).max(7).required(),
});

const findAllTransactionsByPeriod = async (req, res) => {
  const { error } = findAllTransactionsByDateSchema.validate(req.params);
  if (error) {
    throw createError(400, error.message);
  }
  const { _id } = req.user;
  const { periodId } = req.params;
  console.log(periodId)
  const periodLength = periodId.length;
  if (periodId) {
    if (periodLength <= 4) {
      const year = periodId;
      const result = await Transaction.find({ owner: _id, year });
      res.status(200).json({
        message: "All transactions was finded",
        result,
      });
    }
    if (periodLength > 5) {
      const newPeriod = periodId.split("-");
      const year = newPeriod[0];
      const month = newPeriod[1];

      const result = await Transaction.find({
        owner: _id,
        year,
        month,
      });
      res.status(200).json({
        message: "All transactions was finded",
        result,
      });
    }
  }
};

module.exports = findAllTransactionsByPeriod;
