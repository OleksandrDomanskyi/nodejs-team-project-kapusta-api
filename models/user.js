const { Schema, model } = require("mongoose");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    count: {
      balance: {
        type: Number,
        default: 0,
      },
      incomes: {
        type: Array,
        default: [
          { year: 2022, monce: "april", from: "work", value: "5000" },
          { year: 2022, monce: "may", from: "avans", value: "1000" },
        ],
      },
      expenses: {
        type: Array,
        default: [
          { year: 2022, monce: "april", to: "shop", value: "5000" },
          { year: 2022, monce: "may", to: "gift", value: "1000" },
        ],
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
