const express = require("express");
const moment = require("moment");
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
    res.json({
      id: userFound.id,
      name: userFound.name,
      course_id: userFound.course_id,
      role: userFound.role,
    });
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

router.post("/saveExam", async (req, res) => {
  const userInfo = await userDao.getUserById(req.user.user);
  const { payLoad } = req.body;
  let lastExamNo = await teacherDao.getLastExamNo();
  lastExamNo++;
  // create student exam
  for (let index = 0; index < payLoad.studentIds.length; index++) {
    const studentId = payLoad.studentIds[index];
    await teacherDao.createStudentExam(studentId, lastExamNo);
  }
  // create exam slot
  for (const key in payLoad.durationTime) {
    if (payLoad.durationTime.hasOwnProperty(key)) {
      const slots = payLoad.durationTime[key];
      for (let index = 0; index < slots.length; index++) {
        const slot = slots[index];
        await teacherDao.insertIntoExams({
          exam_no: lastExamNo,
          duration: payLoad.totalDuration,
          start_time: slot.start_time,
          end_time: slot.end_time,
          booking_status: false,
          course_id: userInfo.course_id,
          teacher_id: userInfo.id,
          date: moment(payLoad.date).format("YYYY-MM-DD"),
          student_id: null,
          grade: null,
          is_absent: false,
        });
      }
    }
  }
});

router.get("/exam/getFullreport", async (req, res) => {
  try {
    const userId = req.user.user;
    const lists = await teacherDao.getFinalResultReport(userId);
    console.log("FinalResultReport", lists);
    return res.json(lists);
  } catch (error) {
    return res.status(401).json(authErrorObj);
  }
});
router.get("/exam/getStudentNotBooked", async (req, res) => {
  try {
    const userId = req.user.user;
    const lists = await teacherDao.getStudentNotBooked(userId);
    console.log("zzzzzz", lists);
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
