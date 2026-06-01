
 ✔Employee Database Management System

This project is a full-stack backend system built using Node.js, Hapi.js, and MySQL that manages user registration, login authentication, OTP verification, and employee data operations.

🎥Demo video

https://github.com/user-attachments/assets/279255a9-e322-4eb1-9aee-86c6e5b0a712

Features
🔐 User Authentication System
> Users can register with name, email, and password
> Secure login system using email and password
> JWT token generation for session management
> Token-based authorization for protected routes

📩 OTP Email Verification
After login, a 6-digit OTP is generated automatically
OTP is sent to the registered email using Mailtrap (testing email service)
OTP expires after a fixed time (5 minutes)
New OTP is generated every time user logs in again

👨‍💼 Employee Management Module
Add employee details under logged-in user
View all employee records
Update employee information
Delete employee records
Each employee is linked with a specific user using user_id

📊 Excel Integration
Employee data can be exported to Excel files
Excel files are stored in an assets/export folder
Data can be read from Excel and used to perform database operations like deletion

Database (MySQL)
Stores user data, employee data, and OTP verification data
Tables used:
users
employees

📬 Email Service (Mailtrap)

Mailtrap is used as a testing email service to simulate real email sending.

It allows safe testing of OTP email functionality without sending real emails to users. This helps developers verify email workflows during development.

🧰 Tech Stack
Node.js
Hapi.js (Backend Framework)
MySQL (Database)
JWT (Authentication)
Mailtrap (Email Testing)
ExcelJS (Excel handling)
Postman (API testing)

<img width="1536" height="1024" alt="flowchart" src="https://github.com/user-attachments/assets/95df6d69-2504-496e-b1a1-412734e64a87" />





