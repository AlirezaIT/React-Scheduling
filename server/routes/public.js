const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const userDao = require("../services/user_dao");
const router = express.Router();
const expireTime = 300; //seconds
const authErrorObj = {
  errors: [{ param: "Server", msg: "Authorization error" }],
};
const jwtSecret = "12345";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).send({
      errors: [{ param: "Server", msg: "Invalid username or password" }],
    });
  }
  try {
    const user = await userDao.getUser(username);
    if (!user) {
      return res.status(404).send({
        errors: [{ param: "Server", msg: "Invalid username or password" }],
      });
    }
    const isSame = await userDao.checkPassword(password, user.password);
    if (!isSame) {
      return res.status(401).send({
        errors: [{ param: "Server", msg: "Invalid username or password" }],
      });
    }
    const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {
      expiresIn: expireTime,
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * expireTime,
    });
    return res.json({ id: user.id, username: user.username });
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").end();
});

module.exports = router;
