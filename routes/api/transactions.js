const express = require("express");

const { authorize } = require("../../middlewares");
const { transactions: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

// GET ALL TRANSACTIONS
router.get("/", authorize, ctrlWrapper(ctrl.getAllTransactions));

// ADD NEW TRANSACTION
router.post("/", authorize, ctrlWrapper(ctrl.createTransation));

// DELETE TRANSACTION
router.delete("/:id", authorize, ctrlWrapper(ctrl.deleteTransation));

// FIND TRANSACTION BY DATE
router.get("/:date", authorize, ctrlWrapper(ctrl.findAllTransactionsByDate));

// FIND TRANSACTION BY PERIOD - YEAR/MONTH
router.get(
  "/period/:periodId",
  authorize,
  ctrlWrapper(ctrl.findAllTransactionsByPeriod)
);

// router.put("/:id") - ОНОВЛЕННЯ ТРАНЗАКЦІЇ

module.exports = router;
