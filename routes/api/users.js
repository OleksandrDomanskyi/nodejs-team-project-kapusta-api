const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const User = require("../../models/user");
const { createError } = require("../../helpers/createError");

const router = express.Router();

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res, next) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      throw createError(400);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ email, password: hashPassword });
    res.status(201).json({
      email: result.email,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
