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
  const sql = `select se.exam_no,c.name from student_exams se  ,courses c where student_id = ? and se.exam_no = c.id`;
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
