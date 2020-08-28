"use strict";

const StudentExams = require("../models/student_exams");
const db = require("../db/index");
const ReservedexamsOfStudent = require("../models/exams");

const createStudentExams = function (row) {
  return new StudentExams(row.id, row.student_id, row.exam_no);
};
const listReservedexamsOfStudent = function (row) {
  return new ReservedexamsOfStudent(
    row.id,
    row.exam_no,
    row.start_time,
    row.course_id,
    row.date,
    row.grade
  );
};

exports.getStudentExams = async (student_id) => {
  const sql = `SELECT * FROM student_exams where student_id =?`;
  try {
    let studentExams = await db.query(sql, [student_id]);
    console.log(studentExams);
    let lists = studentExams.map((row) => {
      createStudentExams(row);
    });

    return lists;
  } catch (error) {
    throw error;
  }
};

exports.getReservedexamsOfStudent = async (student_id) => {
  const sql = `SELECT * FROM exams where booking_status = 1 and student_id =?`;
  try {
    let reservedExams = await db.query(sql, [student_id]);
    console.log(reservedExams);
    let lists = reservedExams.map((row) => {
      listReservedexamsOfStudent(row);
    });

    return lists;
  } catch (error) {
    throw error;
  }
};
