const express = require("express");
const router = express.Router();
const userDao = require("../services/user_dao");

const authErrorObj = {
  errors: [{ param: "Server", msg: "Authorization error" }],
};
const serverErrorObj = { errors: [{ param: "Server", msg: "Internal error" }] };

router.get("/verify", async (req, res) => {
  try {
    const userId = req.user && req.user.user;
    const userFound = await userDao.getUserById(userId);
    res.json({ id: userFound.id, name: userFound.username });
  } catch (err) {
    res.status(401).json(authErrorObj);
  }
});

module.exports = router;
