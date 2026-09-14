# 🎓 CampusFlow

> A full-stack campus complaint management platform designed to simplify complaint reporting, tracking, and administration.

CampusFlow is a Full-Stack Campus Complaint Management System developed to simplify the process of reporting and managing campus-related complaints.

Students can securely register, log in, raise complaints, and track their complaint status, while administrators can efficiently manage, update, and resolve complaints through a dedicated admin dashboard.

---

## 🚀 Overview

CampusFlow provides a centralized platform for managing campus-related complaints.

The system separates student and administrator workflows, allowing students to submit and monitor complaints while administrators can review, manage, update, and resolve them through a dedicated dashboard.

---

## ✨ Key Features

### 👨‍🎓 Student Portal

- Student registration and login
- Secure authentication
- Raise campus-related complaints
- Track complaint status
- Responsive user interface

### 👨‍💼 Admin Portal

- Dedicated admin dashboard
- View submitted complaints
- Manage complaints
- Update complaint status
- Resolve complaints

### 🔐 Authentication & Security

- JWT-based authentication
- Password hashing using bcrypt
- Protected application workflows

### ☁️ Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted using MongoDB Atlas

---

## 🏗️ System Architecture

```mermaid
flowchart LR
    U[Students / Administrators]
    F[React + Vite Frontend]
    A[Express.js REST API]
    J[JWT Authentication]
    D[(MongoDB Atlas)]

    U --> F
    F --> A
    A --> J
    A --> D
    D --> A
    A --> F
    F --> U
