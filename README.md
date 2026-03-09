🚀 ServiceHub – Home Service Management Platform
📌 Project Overview

ServiceHub is a full-stack web application that connects customers with professional technicians for home services like electrical, plumbing, AC repair, etc.

The platform allows customers to create service requests and technicians to accept and complete jobs efficiently.

This project is built using:

Frontend: React (Vite)

Backend: Spring Boot (REST API)

Database: MySQL

Cloud:-Cloudnary

Authentication: Role-based login (Customer / Technician)

🎯 Key Features
👤 User Module

User Registration (Customer / Technician)

Secure Login System

Role-based Dashboard Access

Profile Management

🛠 Technician Module

Technician registration with specialization

View available service requests

Accept customer jobs

Update job status (Pending → In Progress → Completed)

🏠 Customer Module

Create service requests

Choose service category

Track job status

Rate & review technicians after completion

⭐ Review System

Customers can rate technicians

Feedback stored in Review table

Helps maintain service quality

🗄 Database Structure

The system uses the following main tables:

Users – Stores login and role details

Technician_Details – Stores technician specialization info

Service_Category – Different service types (Plumbing, Electrical, etc.)

Service_Request – Customer service bookings

Review – Ratings and feedback

Relationships:

A Customer creates many Service Requests

A Technician accepts many Service Requests

Each Service belongs to one Category

A Review is given after job completion

🔄 System Workflow

User registers as Customer or Technician.

Customer logs in and creates a service request.

Technician views available requests and accepts one.

Technician completes the service.

Customer gives rating and review.

🛠 Tech Stack
Layer	Technology
Frontend	React + Vite
Backend	Spring Boot
Database	MySQL
API Type	REST API
Version Control	Git & GitHub
💡 Purpose of the Project

ServiceHub was developed to:

Practice full-stack development

Implement real-world database relationships

Understand role-based authentication

Build a scalable service marketplace system


