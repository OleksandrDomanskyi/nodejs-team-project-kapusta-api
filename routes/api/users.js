const express = require("express");

const { authorize, validationBody } = require("../../middlewares");
const controller = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/schemas/user");

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.signup),
  ctrlWrapper(controller.signup)
);

router.post(
  "/login",
  validationBody(schemas.login),
  ctrlWrapper(controller.login)
);

router.get("/current", authorize, ctrlWrapper(controller.current));

router.post("/logout", authorize, ctrlWrapper(controller.logout));

// GET BALANCE

router.get("/balance", authorize, ctrlWrapper(controller.getBalance));

// UPDATE BALANCE
router.patch("/balance", authorize, ctrlWrapper(controller.createBalance));

module.exports = router;
