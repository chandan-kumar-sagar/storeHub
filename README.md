# StoreHub 🚀

StoreHub is a comprehensive, full-stack E-commerce ecosystem consisting of four dedicated platforms: a robust Backend API, a Customer App, an Admin Panel, and a Delivery Management system.

---

## 🏗️ Project Architecture

The project is structured as a monorepo-style collection of services:

- **`/backend`**: Node.js & Express API with MySQL database.
- **`/storehub-user`**: React (Vite) application for customers to browse and buy products.
- **`/storehub-admin`**: React (Vite) dashboard for managing inventory, orders, and users.
- **`/storehub-delivery`**: React (Vite) interface for delivery personnel to manage shipments.

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt.js
- **Environment**: Dotenv

### Frontend (User, Admin, Delivery)
- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: CSS / Tailwind (if applicable)
- **State Management**: React Hooks

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.x or higher)
- MySQL Server
- npm or yarn

### 1. Database Setup
Create a MySQL database and run the necessary migration scripts (found in `/backend/database` if available).

### 2. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file from the example:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=storehub
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

### 3. Frontend Setup (Repeat for User, Admin, Delivery)
1. Navigate to the desired app:
   ```bash
   cd storehub-user
   ```
2. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

---

## ✨ Key Features

### 👤 Customer App (`storehub-user`)
- Product browsing and searching.
- Cart management (Add/Update/Remove).
- Secure checkout with database transactions.
- Order history tracking.

### 🛡️ Admin Panel (`storehub-admin`)
- Inventory management (Stock levels, item descriptions).
- Order fulfillment monitoring.
- User status management (Blocking/Unblocking).
- Sales analytics.

### 🚚 Delivery System (`storehub-delivery`)
- Real-time delivery status updates.
- Cargo management.
- Route optimization (if implemented).

### ⚙️ Backend API
- **Atomic Transactions**: Orders are processed using SQL transactions to ensure data integrity (Stock reduction -> Order creation -> Payment entry).
- **JWT Authentication**: Secure role-based access control.
- **Modular Code**: Generic database helpers for clean CRUD operations.

---

## 📁 Directory Structure

```text
storeHub/
├── backend/            # Express.js Server
│   ├── config/         # Database & App configurations
│   ├── controllers/    # Business logic
│   ├── middleware/     # Authentication & Error handlers
│   ├── routes/         # API Endpoints
│   └── utils/          # Database & Token helpers
├── storehub-user/      # Customer React App
├── storehub-admin/     # Admin React Panel
└── storehub-delivery/  # Delivery React Interface
```

---

## 📄 License

This project is licensed under the MIT License.
