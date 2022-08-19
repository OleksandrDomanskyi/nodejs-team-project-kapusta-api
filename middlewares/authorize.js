const jwt = require("jsonwebtoken");

const { User } = require("../models/schemas/user");

const { createError } = require("../helpers/");

const { SECRET_KEY } = process.env;

const authorize = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError(401, error.message);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);

      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
        throw createError(401, "id fail");
      }

      req.user = user;
      next();
    } catch (error) {
      throw createError(401, error.message);
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = authorize;
