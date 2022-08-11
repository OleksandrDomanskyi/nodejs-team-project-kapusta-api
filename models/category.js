const { model } = require("mongoose");

const { category } = require("./schemas");
const { categorySchema } = category;

const Category = model("category", categorySchema);

module.exports = Category;