const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/user");
const { createError } = require("../../helpers/");
const { authorize } = require("../../middlewares");
const { users: controller } = require("../../controllers");

const router = express.Router();

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const { SECRET_KEY } = process.env;

router.post("/register", async (req, res, next) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
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

// login
router.post("/login", async (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Wrong email");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw createError(401, "Password wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    const { balance } = await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      success: true,
      message: "Login succesfull",
      token,
      balance,
    });
  } catch (error) {
    next(error);
  }
});

//logout
router.get("/logout", authorize, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      throw createError(401, "Not authorized");
    }
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/current", authorize, async (req, res) => {
  const { email, balance } = req.user;
  res.status(200).json({
    success: true,
    email,
    balance,
  });
});

// UPDATE BALANCE
router.patch("/balance", authorize, controller.updateBalance);

module.exports = router;
