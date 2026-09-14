🎓 CampusFlow

A full-stack campus complaint management platform for streamlined
complaint reporting, tracking, and administration.

CampusFlow is a Full-Stack Campus Complaint Management System developed
to simplify the process of reporting and managing campus-related
complaints.

Students can securely register, log in, raise complaints, and track
their complaint status, while administrators can efficiently manage,
update, and resolve complaints through a dedicated admin dashboard.

📌 Table of Contents

Overview

Problem Statement

Objectives

Key Features

User Roles

System Architecture

Application Flow

Student Workflow

Admin Workflow

Complaint Lifecycle

Authentication Flow

Complaint Management Flow

Technology Stack

Project Structure

Deployment Architecture

Live Demo

Screenshots

Getting Started

Project Goals

Future Enhancements

Learning Outcomes

Author

🚀 Overview

CampusFlow provides a centralized platform for handling campus-related
complaints.

The application separates student and administrator workflows:

Students can create accounts, authenticate securely, submit
complaints, and monitor their status.

Administrators can access a dedicated dashboard to review, manage,
update, and resolve submitted complaints.

The project combines a React-based frontend with a Node.js/Express
backend and MongoDB Atlas for data storage.

🎯 Problem Statement

Managing campus complaints through manual processes can make reporting,
tracking, and resolution difficult.

CampusFlow aims to provide a structured digital workflow where
complaints can be submitted by students and managed centrally by
administrators.

🎯 Objectives

Simplify campus complaint submission

Provide students with complaint status tracking

Provide administrators with centralized complaint management

Implement authentication for application access

Build a responsive full-stack web application

Deploy the application using modern cloud platforms

✨ Key Features

👨‍🎓 Student Portal

Student registration

Student login

Secure authentication

Complaint submission

Complaint status tracking

Responsive interface

👨‍💼 Admin Portal

Dedicated admin dashboard

View submitted complaints

Review complaints

Manage complaints

Update complaint status

Resolve complaints

🔐 Authentication & Security

JWT-based authentication

Password hashing using bcrypt

Authentication-aware application workflows

☁️ Deployment

Frontend deployed on Vercel

Backend deployed on Render

Database hosted using MongoDB Atlas

👥 User Roles

flowchart TD
    A[CampusFlow] --> B[Student]
    A --> C[Administrator]

    B --> B1[Register / Login]
    B --> B2[Raise Complaint]
    B --> B3[Track Complaint Status]

    C --> C1[Admin Login]
    C --> C2[View Complaints]
    C --> C3[Manage Complaints]
    C --> C4[Update Status]
    C --> C5[Resolve Complaints]

🏗️ System Architecture

flowchart LR
    U[Students / Administrators]
    FE[React + Vite Frontend]
    API[Node.js + Express.js REST API]
    AUTH[JWT Authentication]
    DB[(MongoDB Atlas)]

    U --> FE
    FE --> API
    API --> AUTH
    API --> DB
    DB --> API
    API --> FE
    FE --> U

Architecture Layers

Layer                  Technology             Responsibility

Presentation           React.js + Vite        User interface and interactions
Styling                Tailwind CSS           Responsive UI styling
Client Communication   Axios                  Frontend-backend communication
Backend                Node.js + Express.js   Server-side logic and REST APIs
Authentication         JWT + bcrypt           Authentication and password security
Database               MongoDB Atlas          Persistent application data
Frontend Deployment    Vercel                 Frontend hosting
Backend Deployment     Render                 Backend hosting

🔄 Application Flow

flowchart TD
    A[User Opens CampusFlow] --> B{User Type}

    B -->|Student| C[Student Portal]
    B -->|Administrator| D[Admin Portal]

    C --> E[Register / Login]
    E --> F[Authenticated Student]
    F --> G[Raise Complaint]
    G --> H[Complaint Sent to Backend]
    H --> I[Complaint Stored in MongoDB]
    I --> J[Admin Reviews Complaint]
    J --> K[Admin Updates Status]
    K --> L[Updated Status Stored]
    L --> M[Student Tracks Status]

    D --> N[Admin Login]
    N --> O[Admin Dashboard]
    O --> J

👨‍🎓 Student Workflow

flowchart TD
    A[Student] --> B[Register]
    B --> C[Login]
    C --> D{Authentication}
    D -->|Success| E[Student Portal]
    D -->|Failure| C
    E --> F[Create Complaint]
    F --> G[Submit Complaint]
    G --> H[Complaint Stored]
    H --> I[Track Complaint]
    I --> J[View Updated Status]

Student Journey:
Register → Login → Authenticate → Student Portal → Raise Complaint →
Submit → Track Status

👨‍💼 Admin Workflow

flowchart TD
    A[Administrator] --> B[Login]
    B --> C{Authentication}
    C -->|Success| D[Admin Dashboard]
    C -->|Failure| B
    D --> E[View Complaints]
    E --> F[Review Complaint]
    F --> G[Manage Complaint]
    G --> H[Update Status]
    H --> I[Resolve Complaint]

Admin Journey:
Login → Admin Dashboard → View Complaints → Review → Manage → Update
Status → Resolve

📝 Complaint Lifecycle

stateDiagram-v2
    [*] --> Submitted
    Submitted --> UnderReview
    UnderReview --> InProgress
    InProgress --> Resolved
    Resolved --> [*]

The lifecycle diagram represents the complaint management flow from
submission through review, progress, and resolution. Keep the exact
status names aligned with the application's implementation.

🔐 Authentication Flow

sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Register / Login
    Frontend->>Backend: Send authentication request
    Backend->>Database: Validate / store user data
    Database-->>Backend: Validation result
    Backend-->>Frontend: Authentication response
    Frontend-->>User: Authenticated application access

CampusFlow uses:

JWT (JSON Web Token) for authentication

bcrypt for password hashing

Backend APIs for application communication

🔁 Complaint Management Flow

flowchart LR
    S[Student] -->|Submit Complaint| F[Frontend]
    F -->|API Request| B[Express Backend]
    B -->|Store Complaint| D[(MongoDB Atlas)]

    D -->|Complaint Data| B
    B --> A[Admin Dashboard]
    A -->|Update Status| B
    B -->|Save Update| D

    D -->|Updated Status| B
    B -->|API Response| F
    F --> S

🛠️ Technology Stack

Frontend

React.js

Vite

Tailwind CSS

Axios

Backend

Node.js

Express.js

Database

MongoDB Atlas

Authentication

JWT (JSON Web Token)

bcrypt

Deployment

Vercel

Render

📂 Project Structure

CampusFlow/
│
├── client/
│   └── Frontend application
│
├── server/
│   └── Backend application
│
├── .gitignore
│
└── README.md

☁️ Deployment Architecture

flowchart LR
    U[User Browser]
    V[Vercel - React Frontend]
    R[Render - Express Backend]
    M[(MongoDB Atlas)]

    U --> V
    V --> R
    R --> M
    M --> R
    R --> V
    V --> U

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🌐 Live Demo

Frontend

https://campusflow-frontend-green.vercel.app

Backend API

https://campusflow-yubf.onrender.com

📸 Screenshots

Screenshots can be added here to showcase the major interfaces.

Student Portal

Add student portal screenshot here.

Admin Dashboard

Add admin dashboard screenshot here.

Complaint Management

Add complaint submission and management screenshots here.

⚙️ Getting Started

Prerequisites

Node.js

npm

MongoDB Atlas account

1. Clone the Repository

git clone https://github.com/Naveenbabu45/CampusFlow.git
cd CampusFlow

2. Install Frontend Dependencies

cd client
npm install

3. Install Backend Dependencies

cd ../server
npm install

4. Configure Environment Variables

Create the required environment configuration for the frontend and
backend according to the application's source-code configuration.

Do not commit secret keys, database credentials, JWT secrets, or other
sensitive environment variables to the repository.

5. Run the Application

Start the backend and frontend using the development commands configured
in their respective package.json files.

Exact environment variable names and scripts should match the current
project configuration.

🎯 Project Goals

📌 Digitize campus complaint handling

📌 Simplify complaint submission

📌 Improve complaint tracking

📌 Centralize administrator management

📌 Implement secure authentication

📌 Build a responsive full-stack application

📌 Deploy the application using cloud platforms

🔮 Future Enhancements

Potential future improvements include:

📧 Email notifications for complaint updates

🔔 Real-time status notifications

📊 Advanced complaint analytics

🔎 Search and filtering improvements

📱 Enhanced mobile experience

📈 Administrative reporting and insights

📚 Learning Outcomes

Through CampusFlow, the project provides hands-on experience with:

Full-stack web application development

React-based frontend development

REST API development

Node.js and Express.js

MongoDB database integration

JWT authentication

Password hashing with bcrypt

Cloud deployment using Vercel and Render

👨‍💻 Author

Kommavarapu Naveen Babu

💻 GitHub:
https://github.com/Naveenbabu45

⭐ Support

If you find CampusFlow useful or interesting, consider giving the
repository a ⭐ star.

<p align="center">

Built with 💻 by <strong>{=html}Kommavarapu Naveen
Babu</strong>{=html}

</p>
