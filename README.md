# 🎓 University Management System – Backend API

A **secure, scalable, and production-ready backend API** built with **TypeScript**, **Node.js**, **Express.js**, and **MongoDB (Mongoose)** for managing **students, faculties, academic departments, semesters, courses, and user authentication**.  
This project follows a **clean modular architecture** ensuring high maintainability and professional-grade structure.

---

## 🚀 Features

This backend provides powerful academic management capabilities:

- 🔐 **Authentication & Authorization** — JWT-based login system with role-based access control (Admin / Faculty / Student)
- 🧑‍🏫 **User Management** — Manage students, faculties, and admins
- 🎓 **Academic Module** — Handle departments, faculties, semesters, and courses
- 🗓️ **Semester Registration** — Manage student registration and course enrollment
- 📚 **Course Management** — CRUD for academic courses and their assigned faculties
- 🧩 **Zod Validation** — Strong runtime schema validation
- ⚙️ **Centralized Error Handling** — Global error middleware and custom `AppError` utility
- 🧱 **Modular Architecture** — Clean folder structure for scalability and reusability
- 🧾 **Environment-based Configuration** — Separate configs for production & development
- 🧠 **Mongoose Models & Pre-hooks** — Optimized MongoDB schemas with TypeScript typings

---

## 🧰 Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| Backend          | TypeScript, Node.js, Express.js     |
| Database         | MongoDB, Mongoose                   |
| Validation       | Zod                                 |
| Authentication   | JWT (Access & Refresh Tokens)        |
| Authorization    | Role-Based Access Control (RBAC)     |
| Utility Tools    | bcrypt, dotenv, cookie-parser        |
| Error Handling   | Custom AppError + Global Middleware  |
| Development      | ESLint, Prettier, Nodemon, ts-node-dev |

---

## 🏗️ Project Structure

```text
src/
├── app/
│   ├── modules/
│   │   ├── academicDepartment/
│   │   ├── academicFaculty/
│   │   ├── academicSemester/
│   │   ├── admin/
│   │   ├── course/
│   │   ├── faculty/
│   │   ├── semesterRegistration/
│   │   ├── student/
│   │   ├── user/
│   │   └── auth/
│   ├── middlewares/
│   ├── utils/
│   ├── errors/
│   ├── config/
│   └── routes/
├── app.ts
├── server.ts
└── tsconfig.json
```

---

## ⚡ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/university-management-system-backend.git
cd university-management-system-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

Make a new `.env` file in the project root and add the following:

```env
NODE_ENV=development
PORT=5000
DB_URL=your_mongodb_connection_url
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=10d
JWT_REFRESH_EXPIRES_IN=30d
```

### 4️⃣ Run the server

```bash
npm run dev
```

---

## 🌐 Deployment Ready

- Easily deployable on **Vercel**, **Render**, or **Railway**
- Uses environment-based configurations for production and development
- MongoDB Atlas compatible

---

## 🧪 API Testing

Use **Postman**, **Thunder Client**, or **Insomnia** to test the API.

Base URL (local):
```
http://localhost:5000/api/v1/
```

---

## 📚 API Endpoints Overview

### 🧑 User Routes (`/api/v1/user`)

| Method | Endpoint         | Description           | Auth |
|--------|------------------|----------------------|------|
| POST   | `/create-student`| Create new student   | 👑 Admin |
| POST   | `/create-faculty`| Create new faculty   | 👑 Admin |
| POST   | `/create-admin`  | Create new admin     | 👑 Admin |
| GET    | `/me`            | Get logged-in user   | 🔐 All |

---

### 🔐 Auth Routes (`/api/v1/auth`)

| Method | Endpoint           | Description              | Auth |
|--------|--------------------|--------------------------|------|
| POST   | `/login`           | User login               | 🔓 Public |
| POST   | `/refresh-token`   | Generate new access token| 🔓 Public |
| POST   | `/change-password` | Change user password     | 🔐 All |
| POST   | `/logout`          | Logout user              | 🔐 All |

---

### 🎓 Academic Routes

#### Academic Semester (`/api/v1/academic-semester`)

| Method | Endpoint      | Description             | Auth |
|--------|----------------|------------------------|------|
| POST   | `/create`      | Create new semester    | 👑 Admin |
| GET    | `/all`         | Get all semesters      | 🔐 All |
| PATCH  | `/:id`         | Update semester info   | 👑 Admin |

#### Academic Faculty (`/api/v1/academic-faculty`)
| Method | Endpoint | Description | Auth |
|--------|-----------|--------------|------|
| POST   | `/create` | Create new faculty | 👑 Admin |
| GET    | `/all` | Get all faculties | 🔐 All |

#### Academic Department (`/api/v1/academic-department`)
| Method | Endpoint | Description | Auth |
|--------|-----------|--------------|------|
| POST   | `/create` | Create new department | 👑 Admin |
| GET    | `/all` | Get all departments | 🔐 All |

---

### 📚 Course Routes (`/api/v1/course`)

| Method | Endpoint | Description | Auth |
|--------|-----------|-------------|------|
| POST   | `/create` | Create a course | 👑 Admin |
| GET    | `/all` | Get all courses | 🔐 All |
| PATCH  | `/:id` | Update course | 👑 Admin |

---

### 🗓️ Semester Registration (`/api/v1/semester-registration`)

| Method | Endpoint | Description | Auth |
|--------|-----------|-------------|------|
| POST   | `/create` | Register new semester | 👑 Admin |
| GET    | `/all` | Get all registrations | 🔐 All |

---

## 👨‍💻 Author

**Sree Alok Roy**  
🎓 *MERN Stack Developer*  
📧 [alokroy602701@gmail.com](mailto:alokroy602701@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com)

---

## 🤝 Contributing

Contributions and suggestions are welcome!  
Feel free to fork and create Pull Requests.

---

