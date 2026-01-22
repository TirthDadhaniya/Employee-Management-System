# Employee Management System

A full-stack Employee Management System designed to streamline HR tasks. This application enables efficient management of employee records, designations, salary entries, and includes secure user authentication.

## Features

- **User Authentication:**
  - Secure Login and Registration pages.
  - Password hashing using `bcryptjs` for security.
- **Employee Management:**
  - Add, update, delete, and view employee profiles.
  - Track personal details: Name, Email, Phone, Gender, DOJ, etc.
- **Designation Management:**
  - Create and manage job titles/designations.
- **Salary Management:**
  - Record and track monthly salary entries for employees.
  - Filter salary records by Employee, Month, and Year.
- **Responsive Frontend:**
  - Modern UI with responsive design.
  - Interactive data tables for searching, sorting, and pagination.
  - Form validation for data integrity.

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), jQuery, DataTables
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** `bcryptjs` (for password encryption)
- **Environment Management:** `dotenv`

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance like MongoDB Atlas)

## Setup & Installation

1. **Clone the repository** (or download the source code):

   ```bash
   git clone <repository_url>
   cd employee-api
   ```

2. **Install Dependencies:**
   Navigate to the project root and run:

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGO_URL=mongodb://127.0.0.1:27017/employee-api
   ```

   _(Note: Adjust the URL if your database is hosted elsewhere)_

4. **Start the Database:**
   Ensure your local MongoDB server is running.

5. **Start the Application:**
   For development (with auto-restart):

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## Project Structure

```
employee-api/
├── backend/
│   ├── controllers/      # Logic for handling requests (Auth, Employee, etc.)
│   ├── model/            # Mongoose schemas (User, Employee, Salary, etc.)
│   ├── routes/           # API route definitions
│   └── db.js             # Database connection logic
├── frontend/
│   ├── css/              # Stylesheets
│   ├── js/               # Frontend logic and API integration
│   └── pages/            # HTML views (Login, Register, Dashboard, etc.)
├── .env                  # Environment variables (not committed)
├── server.js             # Entry point of the server
└── package.json          # Project dependencies and scripts
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new admin user
- `POST /auth/login` - Login to the dashboard

### Employees

- `GET /employees` - List all employees
- `POST /employees` - Add a new employee
- `PUT /employees/:id` - Update employee details
- `DELETE /employees/:id` - Remove an employee

### Designations

- `GET /designations` - List all designations
- `POST /designations` - Create a new designation

### Salary Entries

- `GET /salary-entries` - List salary history
- `POST /salary-entries` - Add a salary record

## Usage

1. Open `http://localhost:3000` (or the frontend file path) in your browser.
2. Register a new account.
3. Login to access the dashboard.
4. Use the navigation to manage Employees, Designations, and Salaries.

   ```

   The backend server will start on `http://localhost:3000`.

   ```

5. **Run the Frontend:**
   Simply open `index.html` in your browser. It will redirect you to the main dashboard.
