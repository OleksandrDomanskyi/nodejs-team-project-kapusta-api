const { Schema } = require("mongoose");

const categorySchema = Schema({
  category: {
    type: String,
    required: [true, "Выберите категорию"],
  },
});

module.exports = { categorySchema };