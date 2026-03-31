
# 🎬 Video Platform Backend 

## 📌 Overview

This project is a backend system for a video platform that supports:

* User authentication using JWT
* Role-Based Access Control (RBAC)
* Video upload and storage using Multer
* Initial video processing pipeline structure

The primary focus of this implementation is on **clean backend architecture, API design, and secure access control**.

---

## 🏗️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (Authentication)
* Multer (File Uploads)
* FFmpeg (partially integrated)

---

## 📂 Project Structure

```text
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── app.js
├── server.js
```

### Architecture

The project follows a layered architecture:

```text
Route → Controller → Service → Database
```

This separation helps in keeping the codebase modular and maintainable.

---

## 🔐 Authentication & Authorization

### JWT Authentication

* User registration and login
* Token-based authentication

### RBAC (Role-Based Access Control)

| Role   | Access        |
| ------ | ------------- |
| Viewer | Read-only     |
| Editor | Upload videos |
| Admin  | Full access   |

Protected routes are secured using middleware.

---

## 📹 Video Upload

### Endpoint

```http
POST /api/videos/upload
```

### Features

* Upload video files using Multer
* Unique file naming
* Store file path and metadata in MongoDB
* Role-based access control (only editor/admin can upload)

---

## ⚙️ Processing Pipeline (Partial)

A basic processing pipeline structure is implemented:

```text
Upload → Trigger Processing → Update Status
```

### What was attempted

* FFmpeg integration for thumbnail extraction
* Processing status tracking (`uploaded → processing → ready`)
* Progress updates

### Challenges faced

* FFmpeg failed for certain video files due to invalid metadata
* Errors such as:

  * `moov atom not found`
  * `no video stream in input`
* Race condition between file upload and processing

Due to these issues and limited time, the processing pipeline is **not fully stable**.

---

## 📑 API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Videos

```http
POST /api/videos/upload
```

---

## 🚀 How to Run

### 1. Install dependencies

```bash
npm install
```

---

### 2. Setup environment variables

Create a `.env` file:

```env
PORT=8000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

---

### 3. Run server

```bash
npm run dev
```

---

## 🧠 Key Learnings

* Designing clean backend architecture with separation of concerns
* Implementing secure authentication and RBAC
* Handling file uploads in Node.js
* Debugging real-world issues with media processing (FFmpeg)
* Understanding async challenges like file write vs processing

---

## ⚠️ Limitations

* Video processing is not fully reliable
* No frontend implementation
* Video streaming is not implemented
* Real-time updates (Socket.io) not implemented

---

## 🔮 Future Improvements

* Reliable video validation before processing (ffprobe)
* Queue-based background processing
* Video streaming using HTTP range requests
* Frontend integration (React)
* Real-time updates using Socket.io

---

## 📌 Note

This project was developed within a limited timeframe (48 hours).
The focus was on building a **strong backend foundation and understanding system design and architecture concepts**, rather than completing all advanced features.

---
