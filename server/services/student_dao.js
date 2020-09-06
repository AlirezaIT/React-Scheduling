"use strict";

const StudentExams = require("../models/student_exams");
const db = require("../db/index");
const ReservedexamsOfStudent = require("../models/exams");

// const createStudentExams = function (row) {
//   return new StudentExams(row.id, row.student_id, row.exam_no);
// }; //for test

exports.getStudentExams = async (student_id) => {
  console.log("get student id for students exams", student_id);
  // const sql = `SELECT * FROM student_exams where student_id =?`;
  // const sql = `select se.exam_no,c.name from student_exams se  ,courses c where student_id = ? and se.exam_no = c.id`;
  const sql = `select distinct c.name ,exam_no from exams e , courses c where c.id = e.course_id and exam_no in (select exam_no from student_exams where student_id = ? and  not EXISTS (select * from exams where student_exams.student_id = exams.student_id and student_exams.exam_no = exams.exam_no and exams.student_id is not null))`;
  try {
    let studentExams = await db.query(sql, [student_id]);
    // console.log(studentExams);
    let lists = studentExams.rows;
    // .map((studentExam) => {
    // return new StudentExams(
    //   studentExam.id,
    //   studentExam.student_id,
    //   studentExam.exam_no
    //   studentExam.name
    // );
    // console.log(rows[0]);
    //           let obj=[];
    //           obj.push(rows[0].countVehicle);
    //           obj.push(exam);

    //           resolve(obj);
    //   return studentExams;
    // });

    return lists;
  } catch (error) {
    throw error;
  }
};
exports.getExamSlots = async (exam_no) => {
  console.log("get slots of specific exams", exam_no);
  // const sql = `SELECT * FROM student_exams where student_id =?`;
  const sql = `select * from exams e where exam_no = ?`;
  try {
    let examSlots = await db.query(sql, [exam_no]);
    // console.log(studentExams);
    let lists = examSlots.rows;
    // .map((studentExam) => {
    // return new StudentExams(
    //   studentExam.id,
    //   studentExam.student_id,
    //   studentExam.exam_no
    //   studentExam.name
    // );
    // console.log(rows[0]);
    //           let obj=[];
    //           obj.push(rows[0].countVehicle);
    //           obj.push(exam);

    //           resolve(obj);
    //   return studentExams;
    // });

    return lists;
  } catch (error) {
    throw error;
  }
};

exports.getReservedexamsOfStudent = async (student_id) => {
  console.log("get student id", student_id);
  const sql = `SELECT e.id,c.name , e.exam_no,e.date,e.start_time,e.end_time,e.grade FROM exams e, courses c where booking_status = 1 and c.id = e.course_id and student_id =?`;
  try {
    let reservedExams = await db.query(sql, [student_id]);
    // console.log(reservedExams);
    let lists = reservedExams.rows;
    // .map((reservedExam) => {
    //   return new ReservedexamsOfStudent(
    //     reservedExam.id,
    //     reservedExam.exam_no,
    //     reservedExam.start_time,
    //     reservedExam.course_id,
    //     reservedExam.date,
    //     reservedExam.grade
    //   );
    // });

    return lists;
  } catch (error) {
    throw error;
  }
};

exports.reservingExamSlots = async (slot_id, student_id) => {
  console.log("get slot id for reserving ", slot_id);
  console.log("get student id for reserving", student_id);
  const sql = `UPDATE exams set booking_status = true ,student_id =? where id = ? `;
  try {
    let reervedSlot = await db.query(sql, [student_id, slot_id]);
    // console.log(reservedExams);
    let lists = reervedSlot.rows;
    // .map((reservedExam) => {
    //   return new ReservedexamsOfStudent(
    //     reservedExam.id,
    //     reservedExam.exam_no,
    //     reservedExam.start_time,
    //     reservedExam.course_id,
    //     reservedExam.date,
    //     reservedExam.grade
    //   );
    // });

    return lists;
  } catch (error) {
    throw error;
  }
};
exports.cancelingExamSlots = async (slot_id) => {
  console.log("get slot id for canceling ", slot_id);
  const sql = `UPDATE exams set booking_status = "false" ,student_id = null where id = ? `;
  try {
    let reervedSlot = await db.query(sql, [slot_id]);
    // console.log(reservedExams);
    let lists = reervedSlot.rows;
    // .map((reservedExam) => {
    //   return new ReservedexamsOfStudent(
    //     reservedExam.id,
    //     reservedExam.exam_no,
    //     reservedExam.start_time,
    //     reservedExam.course_id,
    //     reservedExam.date,
    //     reservedExam.grade
    //   );
    // });

    return lists;
  } catch (error) {
    throw error;
  }
};
