# 🎓 CampusFlow

<p align="center">
  <strong>A Full-Stack Campus Complaint Management System</strong>
</p>

<p align="center">
  Report • Track • Manage • Resolve
</p>

<p align="center">
  <a href="https://campusflow-frontend-green.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
</p>

---

## 📌 Overview

**CampusFlow** is a full-stack campus complaint management platform designed to simplify the process of reporting, tracking, reviewing, and resolving campus-related complaints.

The system provides separate experiences for **students** and **administrators**.

Students can securely register, log in, submit complaints, track their complaints, and view their complaint details.

Administrators can review complaints submitted across the campus, identify the student who raised each complaint, filter complaints, update complaint status, and add administrative remarks.

The project focuses on creating a centralized, transparent, and user-friendly complaint management workflow.

---

# ✨ Key Features

## 👨‍🎓 Student Features

- 🔐 Secure student authentication
- 📝 Submit new complaints
- 🏷️ Categorize complaints
- 📍 Specify complaint location
- ⚡ Set complaint priority
- 📋 View submitted complaints
- 🔎 Search and filter complaints
- 📊 Track complaint status
- 👤 View and manage profile information
- 🔔 User-friendly feedback and notifications
- 📱 Responsive dashboard interface

### Complaint Categories

- Academic
- Facilities
- Hostel
- Mess
- Transport
- Technical
- Other

### Complaint Priorities

- Low
- Medium
- High

### Complaint Status

- Pending
- In Progress
- Resolved

---

## 👨‍💼 Admin Features

- 🔐 Role-based administrator access
- 📊 Admin dashboard
- 📋 View all campus complaints
- 👤 View the student who raised each complaint
- 🔎 Search complaints by title or student
- 🏷️ Filter by category
- 📌 Filter by status
- ⚡ View complaint priority
- 📝 Update complaint status
- 💬 Add administrative remarks
- 📈 View complaint statistics
- 📅 View complaint submission dates
- 🔍 Open detailed complaint information

---

# 🏗️ System Architecture

CampusFlow follows a modern **client-server architecture**.

```mermaid
flowchart LR

    A[👨‍🎓 Student] -->|HTTPS| B[🌐 React Frontend]
    C[👨‍💼 Administrator] -->|HTTPS| B

    B -->|REST API<br/>Axios| D[⚙️ Node.js + Express Backend]

    D -->|Authentication| E[🔐 JWT + bcrypt]
    D -->|Database Operations| F[(🍃 MongoDB)]

    D --> G[📦 Complaint Management]
    G --> F

    D --> H[📊 Statistics]
    H --> F

    B --> I[🚀 Vercel]
    D --> J[☁️ Render]
