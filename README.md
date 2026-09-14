# 🎓 CampusFlow

> A full-stack campus complaint management platform designed to simplify complaint reporting, tracking, and administration.

CampusFlow is a Full-Stack Campus Complaint Management System developed to simplify the process of reporting and managing campus-related complaints.

Students can securely register, log in, raise complaints, and track their complaint status, while administrators can efficiently manage, update, and resolve complaints through a dedicated admin dashboard.

---

## 🚀 Overview

CampusFlow provides a centralized platform for handling campus-related complaints.

The system provides separate workflows for students and administrators:

- Students can register, log in, submit complaints, and track their complaint status.
- Administrators can access a dedicated dashboard to view, manage, update, and resolve complaints.

The application is built using a modern full-stack architecture with React.js on the frontend, Node.js and Express.js on the backend, and MongoDB Atlas for data storage.

---

## 🎯 Objectives

- Simplify campus complaint submission
- Provide students with complaint status tracking
- Provide administrators with centralized complaint management
- Implement secure user authentication
- Build a responsive full-stack web application
- Deploy the application using cloud platforms

---

## ✨ Features

### 👨‍🎓 Student Portal

- Student registration
- Student login
- Secure authentication
- Raise campus-related complaints
- Track complaint status
- Responsive user interface

### 👨‍💼 Admin Portal

- Dedicated admin dashboard
- View submitted complaints
- Review complaints
- Manage complaints
- Update complaint status
- Resolve complaints

### 🔐 Authentication & Security

- JWT-based authentication
- Password hashing using bcrypt
- Protected application workflows
- Secure communication between frontend and backend

### ☁️ Cloud Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted using MongoDB Atlas

---

## 🏗️ System Architecture

```mermaid
flowchart LR
    U[Students / Administrators]
    FE[React + Vite Frontend]
    API[Node.js + Express.js Backend]
    AUTH[JWT Authentication]
    DB[(MongoDB Atlas)]

    U --> FE
    FE --> API
    API --> AUTH
    API --> DB
    DB --> API
    API --> FE
    FE --> U
