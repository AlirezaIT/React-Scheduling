## React client application routes

- Route `/`: redirected to /vehicles
- Route `/vehicles`: Showing the list of all vahicles and their brands and models
- Route `/configure`: Main configure page
- Route `/payment`: Payment Page
- Route `/not-found`: Not found page
- Route `/login`: login page
- Route `/logout`: for logging out

## REST API server

- POST `/login`
  - request login and send username/password
  - response confirmation
- POST `/loghout`
  - sending request
  - response confirmation
- GET `/studentLists`
  - response the liste of all students of a exam
- GET `/studentExams`
  - response the liste of all exams of a student
- POST `/createExam`
  - create exam and its slots on exams table
- GET `/executeExam` **\*\*** TODO
  - response the list of all booked slots
- GET `/reportExam`
  - response the list of all exams
- GET `/availableSlots`
  - response the liste of all available Slots from exam
- PUT `/bookingSlot`
  - Update student id and booking status on specific slot on exams table
- GET `/reserveSlot`
  - response the list of booked slot from exams table
- PUT `/reserveSlot`
  - Update status of booking slot and remove the student id

## Server database

- Table `users` - contains xx yy zz
- Table `vehicles` - list of all vehicles and their brand & model & category and category's price
- Table `reservations` - contains the details of all reservation (current and pass which is flaged by status)

## Main React Components

- `Vehicles` (in `App.js`): contain the data of main page
- `configure` (in `App.js`): cotains the data and arrange the configure page and and includes the components (form.jsx , reservations.jsx,history.jsx)
- `Criteria` (in `configure.jsx`): contains the form and also calculating the price and searching
- `Login` (in `App.js`): handling the login page and operation -
- `Payment` (in `App.js`): handling the payment and saving the reservation.

(only _main_ components, minor ones may be skipped)

## Screenshot

![Configurator Screenshot](https://www.mediafire.com/convkey/fd47/7a1mnmsh6mck8vz6g.jpg)

## Test users

- username ,password
- admin, 123
- alireza, 123
- mosi, 123
- farhad, 123
- amir, 123
- token secret key is 12345
