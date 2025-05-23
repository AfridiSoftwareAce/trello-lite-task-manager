# 🗂️ Trello Lite – Task Management System

A simplified full-stack task management system inspired by Trello — built with **React**, **Node.js**, **Express**, and **MongoDB**. Features include login, task creation, editing, deletion, and drag & drop status tracking.

---

## 🚀 Features

- 🔐 User login & registration (email + password)
- ✅ JWT authentication
- 📝 Create, update, delete tasks
- 📅 Track tasks by status: `To Do`, `In Progress`, `Completed`
- 🖱️ Drag and drop tasks across columns
- 🗃️ MongoDB for data persistence
- ⚙️ Secure password hashing with bcrypt

---

## 🔧 Tech Stack

| Frontend         | Backend           | Database |
|------------------|-------------------|----------|
| React + Redux    | Node.js + Express | MongoDB  |


---

## 📁 Folder Structure
trello-lite/
├── trello-lite-backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── validators/
│ ├── .env
│ ├── server.js
│ └── package.json
├── trello-lite-frontend/
│ └── src/
│ ├── components/
│ ├── features/
│ ├── pages/
│ ├── App.js
│ └── index.js

---

## 🛠️ Setup Instructions

### 📦 Backend

```bash
cd trello-lite-backend
npm install
npm run dev
Create a .env file in trello-lite-backend:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/trello-lite
JWT_SECRET=supersecret123


🌐 Frontend
cd trello-lite-frontend
npm install
npm start

🔐 Authentication
Passwords are hashed using bcrypt

JWT token returned on login/registration

Auth token stored in Redux and attached to all API requests

📦 API Endpoints
Method	Route	Description
POST	/api/login	Login with credentials
POST	/api/register	Register new user
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task

🙌 Author
Afridi Wara – Backend Developer
Feel free to contribute or fork the project!
