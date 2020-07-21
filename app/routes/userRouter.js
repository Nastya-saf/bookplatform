const express = require("express");
const usercontroller = require("../controllers/usercontroller");
const userRouter = express.Router();
const jsonParser = express.json();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "books" + Date.now() + file.originalname);
  },
  limits: { files: 5 },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storageConfig, fileFilter: fileFilter });

userRouter.get("/", isLoggedIn, usercontroller.getUser);
userRouter.get("/profile", isLoggedIn, usercontroller.getProfile);
userRouter.get("/createBook", isLoggedIn, usercontroller.getCreateBook);
userRouter.post(
  "/createBook",
  jsonParser,
  upload.array("filedata", 5),
  usercontroller.postCreateBook
);

userRouter.get(
  "/createPhotoBook",
  isLoggedIn,
  usercontroller.getCreatePhotoBook
);
userRouter.post(
  "/createPhotoBook",
  urlencodedParser,
  upload.array("filedata", 5),
  usercontroller.postCreatePhotoBook
);

userRouter.get("/cart", isLoggedIn, usercontroller.getCart);
userRouter.post("/cart", jsonParser, usercontroller.postCart);
userRouter.get("/additionalData", isLoggedIn, usercontroller.getAdditionalDate);
userRouter.post(
  "/additionalData",
  jsonParser,
  upload.array("filedata", 1),
  usercontroller.postAdditionalDate
);
userRouter.get(
  "/createMessageAdmin",
  isLoggedIn,
  usercontroller.getCreateMessageAdmin
);
userRouter.post(
  "/createMessageAdmin",
  jsonParser,
  usercontroller.postCreateMessageAdmin
);
userRouter.get("/basket/:idBook", isLoggedIn, usercontroller.addBascet);
userRouter.get("/myMessages", isLoggedIn, usercontroller.myMessages);
userRouter.post("/myMessages", jsonParser, usercontroller.postMyMessages);
userRouter.get(
  "/ResponseToReview/:idreview",
  isLoggedIn,
  usercontroller.getResponseToReview
);
userRouter.post(
  "/ResponseToReview/:idreview",
  urlencodedParser,
  usercontroller.postResponseToReview
);
userRouter.get("/Auctions", isLoggedIn, usercontroller.getAuctions);
userRouter.post("/Auctions", jsonParser, usercontroller.postAuctions);
userRouter.get("/bookAuctions", isLoggedIn, usercontroller.getBookAuctions);
userRouter.post("/bookAuctions", jsonParser, usercontroller.postBookAuctions);
userRouter.get("/deleteBook", isLoggedIn, usercontroller.getDeleteBook);
userRouter.post("/deleteBook", jsonParser, usercontroller.postDeleteBook);
userRouter.get("/myBook", isLoggedIn, usercontroller.getMyBook);
userRouter.post("/myBook", jsonParser, usercontroller.postMyBook);
userRouter.get("/booksPurchased", isLoggedIn, usercontroller.getBooksPurchased);
userRouter.get("/putAuction", isLoggedIn, usercontroller.getPutAuction);
userRouter.post("/putAuction", jsonParser, usercontroller.postPutAuction);
userRouter.get("/deliveryMethod", isLoggedIn, usercontroller.getDeliveryMethod);
userRouter.post(
  "/deliveryMethod",
  jsonParser,
  usercontroller.postDeliveryMethod
);
userRouter.get("/paymentMethod", isLoggedIn, usercontroller.getPaymentMethod);
userRouter.post("/paymentMethod", jsonParser, usercontroller.postPaymentMethod);
userRouter.get(
  "/myPlaceInTheTop",
  isLoggedIn,
  usercontroller.getMyPlaceInTheTop
);
userRouter.get("/myDiscount", isLoggedIn, usercontroller.getMyDiscount);
userRouter.post("/subscribe", isLoggedIn, usercontroller.postSubscribe);
userRouter.get(
  "/mySubscriptions",
  isLoggedIn,
  usercontroller.getMySubscriptions
);
userRouter.post(
  "/mySubscriptions",
  jsonParser,
  usercontroller.postMySubscriptions
);
userRouter.post("/userWarnings", jsonParser, usercontroller.postUserWarnings);

userRouter.get(
  "/createPublisher",
  isLoggedIn,
  usercontroller.getCreatePublisher
);
userRouter.post(
  "/createPublisher",
  jsonParser,
  usercontroller.postCreatePublisher
);

userRouter.get("/createGenre", isLoggedIn, usercontroller.getCreateGenre);
userRouter.post("/createGenre", jsonParser, usercontroller.postCreateGenre);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/signin");
}

module.exports = userRouter;
