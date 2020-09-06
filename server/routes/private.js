const express = require("express");
const router = express.Router();
const userDao = require("../services/user_dao");
const teacherDao = require("../services/teacher_dao");
const studentDao = require("../services/student_dao");

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
  const userId = req.user.user;
  try {
    const lists = await teacherDao.getStudentLists(userId);
    return res.json(lists);
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});

router.get("/studentExams", async (req, res) => {
  try {
    const userId = req.user.user;
    const lists = await studentDao.getStudentExams(userId);
    return res.json(lists);
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});

router.get("/reservedExams", async (req, res) => {
  try {
    const userId = req.user.user;
    const lists = await studentDao.getReservedexamsOfStudent(userId);
    return res.json(lists);
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});
router.get("/examSlots/:exam_no", async (req, res) => {
  try {
    const { exam_no } = req.params;
    const lists = await studentDao.getExamSlots(exam_no);
    return res.json(lists);
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});

router.put("/examSlots/:slot_id", async (req, res) => {
  try {
    const user = req.user.user;
    const { slot_id } = req.params;
    const lists = await studentDao.reservingExamSlots(slot_id, user);
    return res.json(lists);
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});
router.put("/deleteExamSlots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lists = await studentDao.cancelingExamSlots(id);
    return res.json(lists);
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});

module.exports = router;
