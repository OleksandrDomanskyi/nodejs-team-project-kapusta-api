const User = require("../../models/schemas/user");
const Joi = require("joi");
const { createError } = require("../../helpers");

const createBalanceSchema = Joi.object({
  balance: Joi.number().required(),
});

const createBalance = async (req, res) => {
  const { error } = createBalanceSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { _id } = req.user;
  const { balance } = req.body;
  const user = await User.findByIdAndUpdate(
    { _id },
    { balance },
    { returnDocument: "after" }
  );
  res.status(200).json({
    message: "balance updated",
    balance: user.balance,
  });
};

module.exports = createBalance;
