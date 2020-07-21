const express = require("express");
const bookController = require("../controllers/bookcontroller");
const bookRouter = express.Router();
const jsonParser = express.json();

bookRouter.get("/:idBook", bookController.book);

module.exports = bookRouter;
