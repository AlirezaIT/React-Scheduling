const baseURL = "/api";

async function userLogin(username, password, role) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: role,
        role: role,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            resolve(user);
          });
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function userLogout() {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/logout", {
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response
          .json()
          .then((obj) => {
            reject(obj);
          }) // error msg in the response body
          .catch((err) => {
            reject({
              errors: [
                { param: "Application", msg: "Cannot parse server response" },
              ],
            });
          }); // something else
      }
    });
  });
}

async function isAuthenticated() {
  const response = await fetch(`${baseURL}/verify`);
  const userJson = await response.json();
  if (response.ok) {
    return userJson;
  } else {
    let err = { status: response.status, errObj: userJson };
    throw err; // An object with the error coming from the server
  }
}

async function getStudentLists() {
  const response = await fetch(`${baseURL}/studentLists`);
  return response.json();
  // if (response.ok) {
  //   return userJson;
  // } else {
  //   let err = { status: response.status, errObj: userJson };
  //   throw err; // An object with the error coming from the server
  // }
}

async function getStudentExams() {
  const response = await fetch(`${baseURL}/studentExams`);
  return response.json();
}
async function getReservedExams() {
  const response = await fetch(`${baseURL}/reservedExams`);
  return response.json();
}
async function getExamSlots(exam_no) {
  //request params
  const response = await fetch(`${baseURL}/examSlots/${exam_no}`);
  //  {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     exam_no: exam_no,
  //   }),
  // });
  return response.json();
}
// async function getExamSlots(exam_no) { //request query
//   const response = await fetch(`${baseURL}/examSlots?exam_no=${exam_no}`);
//   //  {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify({
//   //     exam_no: exam_no,
//   //   }),
//   // });
//   return response.json();
// }

const API = {
  userLogin,
  userLogout,
  isAuthenticated,
  getStudentLists,
  getStudentExams,
  getReservedExams,
  getExamSlots,
};
export default API;
