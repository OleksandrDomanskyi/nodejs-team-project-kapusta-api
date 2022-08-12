const express = require("express");

const { authorize } = require("../../middlewares");
const { transactions: controller } = require("../../controllers");

const router = express.Router();

// ADD NEW TRANSACTION
router.post("/", authorize, controller.createTransation);

// DELETE TRANSACTION
router.delete("/:id", authorize, controller.deleteTransation);

// FIND TRANSACTION BY DATE
router.get("/:date", authorize, controller.findAllTransactionsByDate);

// FINT TRANSACTION BY PERIOD - YEAR/MONTH
// router.get("/period/:year") - ПОШУК ТРАНЗАКЦІЇ ЗА РІК

// router.put("/:id") - ОНОВЛЕННЯ ТРАНЗАКЦІЇ

module.exports = router;
