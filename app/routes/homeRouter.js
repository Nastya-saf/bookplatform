const express = require("express");
const homeController = require("../controllers/homecontroller.js");

const homeRouter = express.Router();
const jsonParser = express.json();

homeRouter.get("/", homeController.home);
homeRouter.post("/", jsonParser, homeController.seach);

homeRouter.get("/search/:search", jsonParser, homeController.menuSeach);

homeRouter.get("/seller/:iduser", homeController.seller);
homeRouter.get("/glossary", homeController.glossary);
homeRouter.get("/regulations", homeController.regulation);
homeRouter.get("/regulations", homeController.regulation);
homeRouter.get("/topSellers", homeController.topSellers);
homeRouter.get("/sellersList", homeController.sellersList);
homeRouter.get(
  "/commetsSeller/:idseller",
  isLoggedIn,
  homeController.getcommetsSeller
);
homeRouter.post("/commetsSeller/:idseller", homeController.postcommetsSeller);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/signin");
}
module.exports = homeRouter;
