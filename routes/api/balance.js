const express = require("express");
const Joi = require("joi");

const Balance = require("../../models/balance");
const { createError } = require("../../helpers");

const router = express.Router();

const balanceCheckSchema = Joi.object({
  userId: Joi.string().required(),
});

// body
// { userId: '62f178d4b3a2e2d1123f868a' }

router.get("/", async (req, res, next) => {
  try {
    const { error } = balanceCheckSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { userId } = req.body;
    const balance = await Balance.findOne({ userId });
    if (!balance) {
      throw createError(404, "User haven't balance");
    }
    res.status(201).json({ balance });
  } catch (error) {
    next(error);
  }
});

const balancePostSchema = Joi.object({
  userId: Joi.string().required(),
  value: Joi.number().required(),
});

// body
// {
// userId: '62f178d4b3a2e2d1123f868a', - STRING
// value: "555", - NUMBER
// }

router.post("/", async (req, res, next) => {
  try {
    const { error } = balancePostSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { userId, value } = req.body;
    // 1. перевірка: чи є в колекції баланс з ID користувача
    const balance = await Balance.findOne({ userId });

    // 2. якщо такий баланс є - то треба його оновити і повернути користувачу оновлений баланс
    if (balance) {
      await Balance.updateOne({ userId }, { userId, value });
      const newBalance = await Balance.findOne({ userId });
      res.status(200).json({ balance: newBalance.value });
    }

    // 3. якщо такого баансу немає - то треба його створити і повернути користувачу баланс
    if (!balance) {
      const newBalance = await Balance.create({ userId, value });
      res.status(201).json({ balance: newBalance.value });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
