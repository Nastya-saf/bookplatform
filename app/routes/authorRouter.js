const express = require("express");
const authorController = require("../controllers/authorcontroller");
const authorRouter = express.Router();
const jsonParser = express.json();
const multer = require("multer");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "authors" + file.originalname);
  },
  limits: { files: 2 },
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

authorRouter.get("/author/:idAuthor", authorController.getAuthor);
authorRouter.get("/createAuthor", isLoggedIn, authorController.getCreateAuthor);
authorRouter.post(
  "/createAuthor",
  jsonParser,
  authorController.postCreateAuthor
);
authorRouter.get("/editAuthor/:id", isLoggedIn, authorController.getEditAuthor);
authorRouter.post(
  "/editAuthor/:id",
  jsonParser,
  upload.array("filedata", 2),
  authorController.postCreateAuthorAdmin
);
authorRouter.get(
  "/createAuthorAdmin",
  isLoggedIn,
  authorController.getCreateAuthorAdmin
);
authorRouter.post(
  "/createAuthorAdmin",
  jsonParser,
  upload.array("filedata", 2),
  authorController.postCreateAuthorAdmin
);
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/signin");
}
module.exports = authorRouter;
