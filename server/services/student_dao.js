"use strict";

const StudentExams = require("../models/student_exams");
const db = require("../db/index");

const createStudentExams = function (row) {
  return new StudentExams(row.id, row.student_id, row.exam_no);
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
