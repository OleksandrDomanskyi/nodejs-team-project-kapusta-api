const bcrypt = require("bcrypt");
const { User } = require("../../models/schemas/user");

const { createError } = require("../../helpers/createError");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hashPassword });

  res.json({
    email: result.email,
  });
};
module.exports = signup;
