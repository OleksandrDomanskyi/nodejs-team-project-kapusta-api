const express = require("express");
const Joi = require("joi");

const User = require("../../models/user");

const { createError } = require("../../helpers");
const { authorize } = require("../../middlewares");

const router = express.Router();

// GET BALANCE
router.get("/balance", authorize, async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { count } = await User.findById({ _id });
    res.status(200).json({ balance: count.balance });
  } catch (error) {
    next(error);
  }
});

const balanceChangeSchema = Joi.object({
  _id: Joi.string(),
  balance: Joi.number().required(),
});

// CHANGE BALANCE
router.patch("/balance", authorize, async (req, res, next) => {
  const { _id } = req.user;
  const { balance } = req.body;
  try {
    const { error } = balanceChangeSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { count } = await User.findById({ _id });
    count.balance = balance;
    const result = await User.findByIdAndUpdate(
      { _id },
      { count },
      { new: true }
    );
    if (!result.count) {
      throw createError(404);
    }
    res.status(200).json({ balance: result.count.balance });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
