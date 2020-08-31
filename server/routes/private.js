const express = require("express");
const router = express.Router();
const userDao = require("../services/user_dao");
const teacherDao = require("../services/teacher_dao");

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

router.get("/studentLists", async (req, res) => {
  console.log("sfdsdfsdf", req.user.user);
  const userId = req.user.user;
  console.log(userId);
  try {
    const lists = await teacherDao.getStudentLists(userId);
    return res.json(lists);
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});

module.exports = router;
