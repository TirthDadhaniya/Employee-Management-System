require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./backend/db");
const employeeRoutes = require("./backend/routes/employee.routes");
const salaryEntryRoutes = require("./backend/routes/salaryEntry.routes");
const designationRoutes = require("./backend/routes/designation.routes");
const authRoutes = require("./backend/routes/auth.routes");
const errMiddleware = require("./backend/middleware/error.middleware");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/employees", employeeRoutes);
app.use("/salary-entries", salaryEntryRoutes);
app.use("/designations", designationRoutes);
app.use("/auth", authRoutes);

connectDB();

app.use(errMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});
