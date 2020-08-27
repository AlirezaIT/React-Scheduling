"use strict";

const StudentCourses = require("../models/student_courses");
const db = require("../db/index");

const createStudentLists = function (row) {
  return new StudentCourses(row.id, row.course_id, row.student_id);
};

exports.getStudentLists = async (course_id) => {
  const sql = `SELECT * FROM student_courses where course_id =?`;
  try {
    let studentLists = await db.query(sql, [course_id]);
    console.log(studentLists);
    let lists = studentLists.map((row) => {
      createStudentLists(row);
    });

    return lists;
  } catch (error) {
    throw error;
  }
};
