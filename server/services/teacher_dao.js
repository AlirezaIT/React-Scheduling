"use strict";

const StudentCourses = require("../models/student_courses");
const db = require("../db/index");

exports.getStudentLists = async () => {
  const sql = `SELECT * FROM student_courses`;
  try {
    let studentLists = await db.query(sql, []);

    // if (!studentLists || !studentLists.rows.length) {
    //   return [];
    // }

    const listMapped = studentLists.rows.map((StudentList) => {
      return new StudentCourses(
        StudentList.id,
        StudentList.course_id,
        StudentList.student_id
      );
    });

    return listMapped;
  } catch (error) {
    throw error;
  }
};
