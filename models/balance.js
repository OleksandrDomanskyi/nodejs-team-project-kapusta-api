const { Schema, model } = require("mongoose");

const balanceSchema = Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
      unique: true,
    },
    value: {
      type: Number,
      required: [true, "value is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Balance = model("balance", balanceSchema);

module.exports = Balance;
