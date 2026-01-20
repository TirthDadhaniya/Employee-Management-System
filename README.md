# Employee Management System

A simple Employee Management System built to learn full-stack development concepts. This application allows you to manage employees, designations, and salary records.

## Features

- **Employee Management:** Add, update, delete, and list employees.
- **Designation Management:** Create and view designations.
- **Salary Management:** Record monthly salaries for employees.
- **Filtering:** Filter salary entries by Employee and Date range (Month/Year).
- **Responsive UI:** Built with basic HTML/CSS and DataTables for sorting and pagination.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (jQuery)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose)

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)

## Setup & Installation

1. **Clone the repository** (if applicable) or download the source code.

2. **Install Backend Dependencies:**
   Open a terminal in the project root folder and run:

   ```bash
   npm install
   ```

3. **Start the Database:**
   Make sure your local MongoDB server is running. The application connects to:
   `mongodb://127.0.0.1:27017/employeeDB`

4. **Start the Server:**

   ```bash
   npm run dev
   ```

   or

   ```bash
   npm start
   ```

   The backend server will start on `http://localhost:3000`.

5. **Run the Frontend:**
   Simply open `index.html` in your browser. It will redirect you to the main dashboard.
