const User = require("../../models/schemas/user");

const updateBalance = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { balance } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id },
      { balance },
      { returnDocument: "after" }
    );
    res.status(200).json({
      message: "balance updated",
      balance: user.balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateBalance;
