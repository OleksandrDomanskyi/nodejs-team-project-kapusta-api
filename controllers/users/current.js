const current = async (req, res) => {
  const { email, balance } = req.user;
  res.status(200).json({
    success: true,
    email,
    balance,
  });
};

module.exports = current;
