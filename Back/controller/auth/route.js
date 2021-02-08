const { login, getRole, getID } = require("../../database/controllers/loginHandler");
const router = require("express").Router();


router.post("/login", login);
router.post("/getRole", getRole);
router.get("/getID", getID);

module.exports = router;