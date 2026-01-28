# PosBuzz - Full-Stack Point of Sale (POS) System

A full-stack Point of Sale application built as an internship task for PosBuzz. This system handles user authentication, inventory management, and processes sales transactions with real-time stock deduction.

## 🚀 Live Deployment

| Service | URL |
| --- | --- |
| **Frontend App (Vercel)** | [Live Link](https://posbuzz-frontend-pearl.vercel.app/) 
| **Backend API (Render)** | [Live Link](https://posbuzz-backend-g33n.onrender.com/) 

> **Demo Credentials:**
> * **Email:** `admin@test.com`
> * **Password:** `123456`
> * *(Note: The system features auto-registration; you can log in with any new email/password combination).*
> 
> 

---

## ✨ Features

* **🔐 secure Authentication:** JWT-based login system with automatic user registration for easy testing.
* **📊 Interactive Dashboard:** Real-time overview of total revenue, total stock, and recent transaction history.
* **📦 Inventory Management:** Add new products with details like SKU, Price, and initial Stock quantity. Visual indicators show low-stock items.
* **💰 Sales Processing:** Record sales transactions that automatically deduct inventory. Prevent sales if stock is insufficient.
* **🎨 Modern UI:** Built with React and Ant Design for a clean, responsive, and professional user experience.
* **⚡ State Management:** Utilizes TanStack Query (React Query) for efficient server-state management and caching on the frontend.

---

## ✅ What was completed

* Full-Stack Architecture: Implemented a modular monorepo structure using NestJS for the backend and React (Vite) for the frontend.

* Authentication & Security: Built a secure JWT-based authentication system. Added an "auto-registration" feature to simplify testing for reviewers (automatically registers new users if credentials don't exist).

* Inventory Management: Developed full CRUD capabilities for products. Implemented real-time stock tracking with visual indicators for low-stock items.

* Sales System: Created a transactional sales engine that verifies stock availability before processing. Sales instantly deduct inventory from the database.

* Modern Dashboard: Designed a responsive UI using Ant Design and TanStack Query, featuring real-time statistics for total revenue, products in stock, and recent transactions.

* Deployment: Successfully deployed the backend to Render and the frontend to Vercel with fully configured environment variables.

* API Documentation: Included a complete Postman Collection in the repository to facilitate easy testing of all API endpoints.

---

## ❌ What was not completed

* Product Update & Delete UI: While the backend likely supports full CRUD operations, the Frontend currently focuses on "Create" and "Read" functionalities to prioritize the core Sales workflow. The "Edit" and "Delete" buttons were not wired up in the user interface due to time constraints.

* Sales History Page: The system records sales in the database and updates the Dashboard statistics (revenue/stock), but a dedicated page to view a detailed table of past transaction logs was not built.

* Pagination: The product list currently loads all items at once. For a production-scale system with thousands of items, server-side pagination would be required.

* Unit & Integration Tests: Comprehensive automated testing (Jest/Supertest) was omitted to focus on delivering a fully deployed, functional full-stack application within the deadline.
  
---

## 👉 Why? (The Explanation)
"I prioritized the 'Critical Path', ensuring the complex logic of authentication, real-time inventory deduction, and deployment was robust and bug-free. I chose to polish the User Experience (UX) of the core 'Sale' feature and ensure a successful live deployment over adding secondary CRUD features like 'Edit Product' or extensive test coverage."

---

## 🛠️ Tech Stack

### **Backend**

* **Framework:** NestJS (Node.js)
* **Database:** PostgreSQL (hosted on Neon DB)
* **ORM:** Prisma
* **Caching:** Redis (hosted on Upstash)
* **Authentication:** Passport JWT

### **Frontend**

* **Framework:** React (Vite)
* **Language:** TypeScript
* **UI Library:** Ant Design
* **State/Data Fetching:** TanStack Query (React Query) & Axios

---

## ⚙️ Local Setup Instructions

Follow these steps to run the project locally on your machine.

### **Prerequisites**

* Node.js (v18+ recommended)
* npm or yarn
* A PostgreSQL database instance
* A Redis instance

### **1. Clone the Repository**

```bash
git clone https://github.com/YOUR_USERNAME/posbuzz-internship-task.git
cd posbuzz-internship-task

```

### **2. Backend Setup**

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install

```

Create a `.env` file in the `backend` root and add your credentials:

```env
# backend/.env
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
REDIS_URL="redis://default:password@host:port"
JWT_SECRET="MySuperSecretKey"
PORT=3000

```

Initialize the database using Prisma:

```bash
npx prisma generate
npx prisma db push

```

Run the backend development server:

```bash
npm run start:dev
# Server will run on http://localhost:3000

```

### **3. Frontend Setup**

Open a new terminal, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install

```

Create a `.env` file in the `frontend` root to point to your local backend:

```env
# frontend/.env
VITE_API_URL="http://localhost:3000"

```

Run the frontend development server:

```bash
npm run dev
# Client will run on http://localhost:5173

```

---

## 📂 Project Structure

```
posbuzz-internship-task/
├── backend/                # NestJS API
│   ├── prisma/             # Database Schema & Migrations
│   └── src/
│       ├── auth/           # Authentication Module
│       ├── products/       # Product Management Module
│       └── sales/          # Sales Transaction Module
│
├── frontend/               # React + Vite App
│   └── src/
│       ├── api/            # Axios instance & endpoints
│       ├── components/     # Reusable UI (Layout, Sidebar, Navbar)
│       └── pages/          # Main Application Views (Login)
│
└── README.md

```

---

## 👤 Author

**Ismail Mahmud Nur**

