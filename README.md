# Employee Management System

A full-stack Employee Management System designed to streamline HR tasks. This application enables efficient management of employee records, designations, and salary entries, featuring a robust backend API and a modern React frontend with secure user authentication.

## Features

- **User Authentication:** 
  - Secure Login and Registration pages using JWT.
  - Password hashing for security.
- **Employee Management:** 
  - CRUD operations for employee profiles.
  - Form validation using `react-hook-form`.
  - Details include: Name, Email, Phone, Gender, Designation, Date of Joining, Initial Salary.
- **Designation Management:** 
  - Create and manage job titles/designations.
- **Salary Management:** 
  - Record and track monthly salary entries for employees.
  - Filter and view salary history.
- **Modern Frontend:** 
  - Built with React and Vite.
  - Responsive design with CSS Modules.
  - Real-time form validation.

## Tech Stack

- **Frontend:** 
  - React (Vite)
  - React Router DOM
  - React Hook Form
  - Axios
  - CSS Modules
- **Backend:** 
  - Node.js
  - Express.js
- **Database:** 
  - MongoDB (Mongoose)
- **Authentication:** 
  - JSON Web Tokens (JWT)
  - bcryptjs

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

## Setup & Installation

The project is divided into two parts: `backend` and `frontend`.

### 1. Clone the repository

```bash
git clone <repository_url>
cd "Employee Management System"
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URL=mongodb://127.0.0.1:27017/employee-api
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

Start the backend server:

```bash
npm run dev
```
The server will start on `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```
The application will usually run on `http://localhost:5173`.

## Project Structure

```
Employee Management System/
├── backend/
│   ├── controllers/      # Route controllers (Auth, Employee, etc.)
│   ├── middleware/       # Custom middleware (Error handling)
│   ├── model/            # Mongoose models
│   ├── routes/           # Express routes
│   ├── db.js             # Database connection
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components (Button, Header, Tables)
│   │   ├── pages/        # Page components (Login, Employee, etc.)
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # React entry point
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive token

### Employees
- `GET /employees` - List all employees
- `GET /employees/:id` - Get single employee details
- `POST /employees` - Add a new employee
- `PUT /employees/:id` - Update employee details
- `DELETE /employees/:id` - Remove an employee

### Designations
- `GET /designations` - List all designations
- `POST /designations` - Create a new designation
- `PUT /designations/:id` - Update designation

### Salary Entries
- `GET /salary-entries` - List salary history
- `POST /salary-entries` - Add a salary record
- `PUT /salary-entries/:id` - Update salary record
