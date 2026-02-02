require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const employeeRoutes = require("./routes/employee.routes");
const salaryEntryRoutes = require("./routes/salaryEntry.routes");
const designationRoutes = require("./routes/designation.routes");
const authRoutes = require("./routes/auth.routes");
const errMiddleware = require("./middleware/error.middleware");
const PORT = 3000;

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
