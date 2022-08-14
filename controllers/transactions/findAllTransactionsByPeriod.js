const Transaction = require("../../models/transaction");

const getAllTransactionsByPeriod = async (req, res) => {
  const { _id } = req.user;
  const { period } = req.params;
  const periodLenght = period.length;
  if (period) {
    if (periodLenght <= 4) {
      const year = period;
      const result = await Transaction.find({ owner: _id, year });
      res.status(200).json({
        message: "All transactions was finded",
        result,
      });
    }
    if (periodLenght > 5) {
      const newPeriod = period.split("-");
      const year = newPeriod[0];
      const month = newPeriod[1];

      const result = await Transaction.find({
        owner: _id,
        year,
        month,
      });
      res.status(200).json({
        message: "All transactions was finded",
        result,
      });
    }
  }
};

module.exports = getAllTransactionsByPeriod;
