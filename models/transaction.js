const { Schema, model } = require("mongoose");

const transactionSchema = Schema(
  {
    type: {
      type: String,
      enum: ["income", "expenses"],
      required: true,
    },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    category: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
