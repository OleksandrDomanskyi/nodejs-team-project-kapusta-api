const { User } = require("../../models/schemas/user");

const getBalance = async (req, res) => {
  const { _id } = req.user;
  const { balance } = await User.findById({ _id });
  res.status(200).json({
    success: true,
    balance,
  });
};

module.exports = getBalance;
