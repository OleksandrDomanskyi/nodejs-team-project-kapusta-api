const Transaction = require("../../models/transaction");
const Joi = require("joi");

const findAllTransactionsByDateSchema = Joi.object({
  date: Joi.date().required(),
});

const findAllTransactionsByDate = async (req, res) => {
  findAllTransactionsByDateSchema.validate(req.params.date);
  const { date } = req.params;
  console.log(date);

  const normalizedDate = new Date(date);
  const day = normalizedDate.getDate();
  const month = String(normalizedDate.getMonth() + 1).padStart(2, 0);
  const year = normalizedDate.getFullYear();

  const result = await Transaction.find({
    owner: req.user._id,
    year,
    month,
    day,
  });

  res.status(200).json({
    message: "All transactions was finded",
    result,
  });
};

module.exports = findAllTransactionsByDate;
