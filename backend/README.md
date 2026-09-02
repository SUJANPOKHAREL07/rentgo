# 🚗 VutungTung Rental – Backend

[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-green?logo=node.js)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Container-Docker-blue?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Overview

The **VutungTung Rental Backend** is the server-side application that powers the VutungTung car & bike rental platform.  
It handles **authentication**, **listings**, **bookings**, **uploads**, and all the API logic that connects to the frontend.  
Built using **TypeScript**, **Node.js**, and **Prisma ORM**, and fully **Docker-ready** for production.

---

## ✨ Features

- 🔐 **JWT-based Authentication** (login, register, role-based access)
- 🚘 **Rental Listings** CRUD operations
- 📅 **Booking Management** (create, cancel, track)
- 🖼️ **Image Uploads** with local file storage
- ⚙️ **RESTful API Design** for frontend/mobile integration
- 🐳 **Docker Support** for seamless setup
- 🧩 **Prisma ORM** for structured database operations

---

## 🧠 Tech Stack

| Category        | Technology |
|-----------------|-------------|
| Language        | TypeScript |
| Runtime         | Node.js |
| Framework       | Express.js |
| ORM / DB Layer  | Prisma |
| Database        | PostgreSQL / MySQL  |
| Containerization| Docker, Docker Compose |


---

## ⚙️ Getting Started

### 1️⃣ Prerequisites

Make sure you have the following installed:

- Node.js v14 or later  
- Docker & Docker Compose  
- A running database (PostgreSQL/MySQL)

---

### 2️⃣ Clone & Install

git clone https://github.com/vutungtung/vutungtungrental_backend.git
cd vutungtungrental_backend
npm install

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and fill it like below:

DATABASE_URL="postgresql://user:password@localhost:5432/vutungtungdb?schema=public"
JWT_SECRET="your_secret_key"
PORT=3000
UPLOAD_PATH="./uploads"

> ⚠️ Make sure your database credentials are correct.

---

### 4️⃣ Run with Docker

docker-compose up --build

This will start the backend and database containers.

---

### 5️⃣ Run Locally (without Docker)

#### Development Mode:
npm run dev

#### Production Build:
npm run build
npm start

---

## 🧩 Database & Prisma

The database schema lives in the `/prisma/schema.prisma` file.

#### Run migrations
npx prisma migrate dev

#### Generate Prisma client
npx prisma generate

#### View database in Prisma Studio
npx prisma studio

---

## 📁 Folder Structure

vutungtungrental_backend/
├── prisma/               # Prisma schema and migrations
├── src/
│   ├── modules/          # Feature-specific modules (user, booking, listing, etc.)
│   ├── uploads/          # Uploaded files directory
│   ├── main.ts            # Main application entry
│   └── ...               # Other supporting files
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md

---

## 🧾 API Documentation

Example endpoint:

### 🔹 Register User
POST /api/auth/register

**Body:**
{
  "email": "user@example.com",
  "password": "secret123"
}

**Response:**
{
   "message": "Logged In",
    "role": "user",
 
}

> Full API documentation can be added in Postman / Swagger format (recommended for production).

---

## 🧑‍💻 Contributing

Contributions are welcome! 🙌  
To contribute:

1. Fork the repository  
2. Create a new branch  
   git checkout -b feature/my-feature
3. Commit your changes  
   git commit -m "Add: my awesome feature"
4. Push and open a Pull Request

Please ensure code follows the formatting rules and passes lint checks.

---


---

## 📬 Contact

Author: @vutungtung  
For inquiries or issues, open a GitHub Issue or reach out directly.

---

⭐ If you like this project, please star the repo to show your support!

🧱 Built with love and TypeScript 💙----
