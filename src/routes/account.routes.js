const { Router } = require("express");
const router = Router();
const { verifyToken, isAdmin } = require("../middlewares/index");

const {
  doGetAllAccounts,
  doGetInsertAccount,
  doGetEditAccount,
  doGetDeleteAccount,
  doPostInsertAccount,
  doPostEditAccount,
  getAccBalance,
} = require("../controllers/account.controller");

router.get("/", [verifyToken, isAdmin], doGetAllAccounts);
router.get("/insert", verifyToken, doGetInsertAccount);
router.post("/insert", verifyToken, doPostInsertAccount);
router.get("/edit/:id", [verifyToken, isAdmin], doGetEditAccount);
router.post("/edit/:id", [verifyToken, isAdmin], doPostEditAccount);
router.get("/delete/:id", [verifyToken, isAdmin], doGetDeleteAccount);
router.get("/balance/:id", [verifyToken], getAccBalance);

module.exports = router;
