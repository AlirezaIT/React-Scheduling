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

exports.getLastExamNo = async (userId) => {
  const sql = `select exam_no from exams ORDER by exam_no DESC Limit 1`;
  console.log(sql);
  try {
    let studentLists = await db.query(sql, []);
    const result = studentLists.rows[0];
    return result ? result.exam_no : 1;
  } catch (error) {
    throw error;
  }
};

exports.insertIntoExams = async ({
  exam_no,
  duration,
  start_time,
  end_time,
  booking_status = false,
  course_id,
  teacher_id,
  date,
  student_id = null,
  grade = null,
  is_absent = false,
}) => {
  const sql = `INSERT INTO exams(exam_no, duration, start_time, end_time, booking_status, course_id, teacher_id , date , student_id, grade, is_absent) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
  console.log(sql);
  try {
    let studentLists = await db.query(sql, [exam_no, duration, start_time, end_time, booking_status, course_id, teacher_id, date, student_id, grade, is_absent]);
    console.log(sql);
    // if (!studentLists || !studentLists.rows.length) {
    //   return [];
    // }

    const lastExamNo = studentLists.rows[0];

    return lastExamNo;
  } catch (error) {
    throw error;
  }
};

exports.createStudentExam = async (student_id, exam_no) => {
  const sql = `INSERT INTO student_exams(student_id, exam_no) VALUES(?,?)`;
  try {
    await db.query(sql, [student_id, exam_no]);
  } catch (error) {
    throw error;
  }
};
