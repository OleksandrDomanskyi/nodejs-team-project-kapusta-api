const express = require("express");

const { authorize } = require("../../middlewares");
const { transactions: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

// ADD NEW TRANSACTION
router.post("/", authorize, ctrlWrapper(ctrl.createTransation));

// DELETE TRANSACTION
router.delete("/:id", authorize, ctrlWrapper(ctrl.deleteTransation));

// FIND TRANSACTION BY DATE
router.get("/:date", authorize, ctrlWrapper(ctrl.findAllTransactionsByDate));

// FINT TRANSACTION BY PERIOD - YEAR/MONTH
// router.get("/period/:year") - ПОШУК ТРАНЗАКЦІЇ ЗА РІК

// router.put("/:id") - ОНОВЛЕННЯ ТРАНЗАКЦІЇ

module.exports = router;
