import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EmployeeTable.module.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ModuleRegistry, themeAlpine, themeBalham, themeMaterial, themeQuartz } from "ag-grid-community"; // Import the theme object
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const EmployeeTable = ({ title = "Table" }) => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "e_name",
      headerName: "Name",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 170,
      maxWidth: 250,
      cellDataType: "text",
    },
    {
      field: "e_mail",
      headerName: "Email",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 200,
      maxWidth: 270,
      cellDataType: "text",
    },
    {
      field: "e_phone",
      headerName: "Phone",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      maxWidth: 170,
      resizable: false,
      cellDataType: "text",
    },
    {
      field: "e_gender",
      headerName: "Gender",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 130,
      maxWidth: 170,
      resizable: false,
      cellDataType: "text",
    },
    {
      field: "e_designation",
      headerName: "Designation",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 200,
      maxWidth: 300,
      valueGetter: (params) => params.data.e_designation?.name || "No Designation",
    },
    {
      field: "e_dateOfJoining",
      headerName: "Joining Date",
      filter: "agDateColumnFilter",
      valueGetter: (params) => {
        return params.data.e_dateOfJoining ? new Date(params.data.e_dateOfJoining) : null;
      },

      valueFormatter: (params) => {
        return params.value ? params.value.toLocaleDateString() : "";
      },
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          if (cellValue == null) return -1;

          const cellDate = new Date(cellValue.getTime());
          cellDate.setHours(0, 0, 0, 0);

          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) return 0;
          if (cellDate < filterLocalDateAtMidnight) return -1;
          if (cellDate > filterLocalDateAtMidnight) return 1;
        },
        browserDatePicker: true,
      },
      valueFormatter: (p) => new Date(p.value).toLocaleDateString(),
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      resizable: false,
      cellDataType: "date",
    },
    {
      field: "e_initialSalary",
      headerName: "Salary",
      valueFormatter: (params) => `₹${params.value}`,
      sortable: true,
      filter: true,
      flex: 1,
      resizable: false,
    },
    {
      headerName: "Actions",
      minWidth: 150,
      maxWidth: 150,
      resizable: false,
      cellClass: styles["centered-cell"],
      cellRenderer: (params) => {
        return (
          <>
            {/* <div className={styles["action-buttons"]}> */}
            <Button
              text="Edit"
              variant="primary"
              small={true}
              onClick={() => navigate(`/employee?id=${params.data._id}`)}
            />
            <Button text="Delete" variant="danger" small={true} onClick={() => handleDeleteEmployee(params.data._id)} />
            {/* </div> */}
          </>
        );
      },
    },
  ]);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 30, 50, 100, 200, 1000];

  const myTheme = themeQuartz.withParams({
    browserColorScheme: "light",
    fontFamily: "'Inter', sans-serif",
    headerFontSize: 15,
    fontSize: 14,
    spacing: 8,
  });

  async function fetchEmployees() {
    try {
      const res = await axios.get("http://localhost:3000/employees");
      setRowData(res.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete logic
  const handleDeleteEmployee = async (empId) => {
    console.log("Delete clicked for:", empId);
    try {
      await axios.delete(`http://localhost:3000/employees/${empId}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <>
      <h3 className={styles["section-header"]}>{title}</h3>
      <div className="table-responsive">
        <div style={{ height: 500, width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            theme={myTheme}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;
