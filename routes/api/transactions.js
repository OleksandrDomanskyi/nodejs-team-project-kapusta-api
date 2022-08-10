const express = require("express");

const { authorize } = require("../../middlewares");
const { transactions: controller } = require("../../controllers");

const router = express.Router();

// ADD NEW TRANSACTION
router.post("/", authorize, controller.createTransation);

// FIND TRANSACTION BY DATE
router.get("/:date", authorize, controller.findAllTransactionsByDate);

//
// router.get("/period/:year") - ПОШУК ТРАНЗАКЦІЇ ЗА РІК
// router.delete("/:id") - ВИДАЛЕННЯ ТРАНЗАКЦІЇ
// router.put("/:id") - ОНОВЛЕННЯ ТРАНЗАКЦІЇ

module.exports = router;
