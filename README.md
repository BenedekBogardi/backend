## 🧠 BrainBoost backend dokumentáció

API Dokumentáció elérhető a `http://localhost:3000/api` végponton.

## 💻 Project setup

```bash
$ npm install
```

## 🏃‍♂️‍➡️ Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## ✅ Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 🚀 Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

## 💾 Database structure
![Kép](https://github.com/user-attachments/assets/f5c65b5f-188d-4e12-8f78-c8ef768b76dc)

## 📄 Prisma Schema Typedoc

This section documents the data models, enums, and relationships defined in the Prisma schema for the BrainBoost platform.

---

### 🔧 Generator and Datasource

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

---

### 🧱 Enums

#### `Subjects`

Subjects that teachers can specialize in and assign work for:
- `Maths`
- `History`
- `Literature`
- `English`
- `Science`
- `Compsci`

#### `Role`

User roles in the application:
- `Admin`
- `Teacher`
- `Student`

#### `Level`

Educational level categories for students:
- `Elementary`
- `Secondary`
- `High`
- `University`

---

### 🧩 Models

#### `Assignment`

Represents a task assigned by a teacher.

| Field                    | Type                     | Attributes                               | Description                                  |
|-------------------------|--------------------------|-------------------------------------------|----------------------------------------------|
| `id`                    | `Int`                    | `@id @default(autoincrement())`           | Primary key.                                 |
| `subject`               | `String`                 |                                           | Subject of the assignment.                   |
| `name`                  | `String`                 |                                           | Title of the assignment.                     |
| `description`           | `String`                 |                                           | Details of the assignment.                   |
| `ageGroup`              | `String`                 |                                           | Targeted student age group.                  |
| `teacherId`             | `Int`                    |                                           | ID of the teacher assigning it.              |
| `teacher`               | `Teacher`                | `@relation(fields: [teacherId], references: [id])` | Related teacher.                             |
| `students`              | `StudentAssignment[]`    |                                           | Associated student assignments.              |
| `StudentAssignmentFile` | `StudentAssignmentFile[]`|                                           | Student-uploaded files for the assignment.   |

---

#### `Admin`

Admin user with special privileges.

| Field      | Type     | Attributes                       | Description           |
|-----------|----------|-----------------------------------|-----------------------|
| `id`      | `Int`    | `@id @default(autoincrement())`   | Primary key.          |
| `name`    | `String` |                                   | Admin name.           |
| `email`   | `String` | `@unique`                         | Unique email address. |
| `password`| `String` |                                   | Hashed password.      |
| `role`    | `Role`   | `@default(Admin)`                 | Always `Admin`.       |

---

#### `User`

Base model for all users (students and teachers).

| Field       | Type     | Attributes                       | Description                                   |
|------------|----------|-----------------------------------|-----------------------------------------------|
| `id`       | `Int`    | `@id @default(autoincrement())`   | Primary key.                                  |
| `firstName`| `String` |                                   | First name.                                   |
| `lastName` | `String` |                                   | Last name.                                    |
| `email`    | `String` | `@unique`                         | Unique email address.                         |
| `password` | `String` |                                   | Hashed password.                              |
| `role`     | `Role`   | `@default(Student)`               | Role: `Student`, `Teacher`, or `Admin`.       |
| `sTeacherId`| `Int?`  |                                   | Optional preferred teacher ID for students.   |
| `teacher`  | `Teacher?`|                                  | Optional relation to teacher.                 |
| `student`  | `Student?`|                                  | Optional relation to student.                 |

---

#### `Teacher`

Teacher-specific data, linked to `User`.

| Field             | Type         | Attributes                                                       | Description                        |
|------------------|--------------|-------------------------------------------------------------------|------------------------------------|
| `id`             | `Int`        | `@id @default(autoincrement())`                                   | Primary key.                       |
| `user`           | `User`       | `@relation(fields: [id], references: [id], onDelete: Cascade)`    | Linked user record.                |
| `subject`        | `Subjects`   |                                                                   | Subject of expertise.              |
| `hourlyRate`     | `Int`        |                                                                   | Hourly teaching rate.              |
| `rating`         | `Float`      |                                                                   | Average rating from students.      |
| `numberOfRatings`| `Int`        |                                                                   | Total number of received ratings.  |
| `Assignment`     | `Assignment[]`|                                                                  | Assignments given by the teacher.  |

---

#### `Student`

Student-specific data, linked to `User`.

| Field                     | Type                      | Attributes                                                       | Description                        |
|--------------------------|---------------------------|-------------------------------------------------------------------|------------------------------------|
| `id`                     | `Int`                     | `@id @default(autoincrement())`                                   | Primary key.                       |
| `user`                   | `User`                    | `@relation(fields: [id], references: [id], onDelete: Cascade)`    | Linked user record.                |
| `ageGroup`               | `Level`                   |                                                                   | Educational level of the student.  |
| `studentAssignments`     | `StudentAssignment[]`     |                                                                   | Assigned tasks.                    |
| `StudentAssignmentFile`  | `StudentAssignmentFile[]` |                                                                   | Uploaded files for assignments.    |

---

#### `StudentAssignment`

Link table between `Student` and `Assignment`.

| Field         | Type       | Attributes                                                   | Description                         |
|--------------|------------|---------------------------------------------------------------|-------------------------------------|
| `studentId`  | `Int`      |                                                               | Student ID.                         |
| `assignmentId`| `Int`     |                                                               | Assignment ID.                      |
| `completed`  | `Boolean`  | `@default(false)`                                             | If the assignment is completed.     |
| `mark`       | `Int`      | `@default(0)`                                                 | Grade given.                        |

> **Primary Key:** `@@id([studentId, assignmentId])`

---

#### `StudentAssignmentFile`

Files submitted by students for assignments.

| Field         | Type       | Attributes                                                   | Description                           |
|--------------|------------|---------------------------------------------------------------|---------------------------------------|
| `assignmentId`| `Int`      |                                                               | Related assignment ID.                |
| `studentId`   | `Int`      |                                                               | Related student ID.                   |
| `fileName`    | `String`   |                                                               | Original file name.                   |
| `fileType`    | `String`   |                                                               | MIME type (e.g., `application/pdf`).  |
| `fileData`    | `Bytes`    |                                                               | File binary data.                     |
| `uploadedAt`  | `DateTime` | `@default(now())`                                             | Upload timestamp.                     |

> **Primary Key:** `@@id([studentId, assignmentId])`
