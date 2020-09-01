"use strict";

// const student_lists = require("../models/student_lists");
const db = require("../db/index");

exports.getStudentLists = async (userId) => {
  const sql = `SELECT id , username,name from users where role = "student" and  id in (
    select sc.student_id from users u , courses c , student_courses sc where u.id = ? and u.course_id = c.id and sc.course_id = u.course_id and sc.student_id not in 
    (select e.student_id from student_exams se ,exams e where se.exam_no =e.exam_no and grade is not NULL)
    )`;
  console.log(sql);
  try {
    let studentLists = await db.query(sql, [userId]);
    console.log(sql);
    if (!studentLists || !studentLists.rows.length) {
      return [];
    }

    const student_lists = studentLists.rows;

    // student_lists = studentLists.rows.map((StudentList) => {

    // return new student_lists(
    //   StudentList.id,
    //   StudentList.username,
    //   StudentList.name
    // );
    // });

    return student_lists;
  } catch (error) {
    throw error;
  }
};
