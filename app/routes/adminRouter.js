const express = require("express");
const admincontroller = require("../controllers/admincontroller");
const adminRouter = express.Router();
const jsonParser = express.json();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

adminRouter.get("/", isLoggedIn, admincontroller.getAdmin);
adminRouter.post("/", jsonParser, admincontroller.postAdmin);
adminRouter.get("/createState", isLoggedIn, admincontroller.getState);
adminRouter.post("/createState", urlencodedParser, admincontroller.postState);
adminRouter.get("/createGenre", isLoggedIn, admincontroller.getGenre);
adminRouter.post("/createGenre", jsonParser, admincontroller.postGenre);
adminRouter.get("/editGenre/:id", isLoggedIn, admincontroller.getEditGenre);
adminRouter.get(
  "/createRegulations",
  isLoggedIn,
  admincontroller.getRegulation
);
adminRouter.post(
  "/createRegulations",
  urlencodedParser,
  admincontroller.postRegulation
);
adminRouter.get("/createGlossary", isLoggedIn, admincontroller.getGlossary);
adminRouter.post(
  "/createGlossary",
  urlencodedParser,
  admincontroller.postGlossary
);
adminRouter.get(
  "/createDeliveryMethod",
  isLoggedIn,
  admincontroller.getCreateDeliveryMethod
);
adminRouter.post(
  "/createDeliveryMethod",
  urlencodedParser,
  admincontroller.postCreateDeliveryMethod
);
adminRouter.get(
  "/createPublisher",
  isLoggedIn,
  admincontroller.getCreatePublisher
);
adminRouter.post(
  "/createPublisher",
  jsonParser,
  admincontroller.postCreatePublisher
);
adminRouter.get(
  "/editPublisher/:id",
  isLoggedIn,
  admincontroller.getEditPublisher
);
adminRouter.get(
  "/createProductGroup",
  isLoggedIn,
  admincontroller.getCreateProductGroup
);
adminRouter.post(
  "/createProductGroup",
  urlencodedParser,
  admincontroller.postCreateProductGroup
);
adminRouter.get(
  "/createPaymentMethod",
  isLoggedIn,
  admincontroller.getCreatePaymentMethod
);
adminRouter.post(
  "/createPaymentMethod",
  urlencodedParser,
  admincontroller.postCreatePaymentMethod
);

adminRouter.get(
  "/createTypesOfBinding",
  isLoggedIn,
  admincontroller.getTypesOfBindings
);
adminRouter.post(
  "/createTypesOfBinding",
  urlencodedParser,
  admincontroller.postTypesOfBindings
);

adminRouter.post("/createAuthor", jsonParser, admincontroller.postCreateAuthor);

adminRouter.get("/usersList", isLoggedIn, admincontroller.getUsersList);
adminRouter.post("/usersList", jsonParser, admincontroller.postUsersList);
adminRouter.get("/blackList", isLoggedIn, admincontroller.getBlackList);
adminRouter.post("/blackList", jsonParser, admincontroller.postBlackList);
adminRouter.get(
  "/discountSystem",
  isLoggedIn,
  admincontroller.getDiscountSystem
);
adminRouter.post(
  "/discountSystem",
  jsonParser,
  admincontroller.postDiscountSystem
);
adminRouter.get(
  "/submissionApplications",
  isLoggedIn,
  admincontroller.getSubmissionApplications
);
adminRouter.post(
  "/submissionApplications",
  jsonParser,
  admincontroller.postSubmissionApplications
);
adminRouter.get("/sales", isLoggedIn, admincontroller.getSales);
adminRouter.post("/sales", jsonParser, admincontroller.postSales);
adminRouter.get("/adminMessages", isLoggedIn, admincontroller.getAdminMessages);
adminRouter.post(
  "/adminMessages",
  jsonParser,
  admincontroller.postAdminMessages
);
adminRouter.get("/transactions", isLoggedIn, admincontroller.getTransactions);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.admin) {
      return next();
    }
  }

  res.redirect("/signin");
}
module.exports = adminRouter;
