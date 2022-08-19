const { User } = require("../../models/schemas/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    success: true,
    message: "Logout Success",
  });
};

module.exports = logout;
