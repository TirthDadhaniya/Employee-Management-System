import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { themeQuartz } from "ag-grid-community";
import axios from "axios";
import Button from "../Button/Button";
import styles from "./Table.module.css";

const EmployeeTable = ({ title = "Table" }) => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);

  // Default column properties for responsive behavior
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    suppressSizeToFit: false,
  }), []);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "e_name",
      headerName: "Name",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 120,
      cellDataType: "text",
    },
    {
      field: "e_mail",
      headerName: "Email",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 180,
      cellDataType: "text",
    },
    {
      field: "e_phone",
      headerName: "Phone",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 120,
      cellDataType: "text",
    },
    {
      field: "e_gender",
      headerName: "Gender",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 90,
      cellDataType: "text",
    },
    {
      field: "e_designation",
      headerName: "Designation",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 130,
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
        if (!params.value) return "";
        return params.value.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
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
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 120,
      cellDataType: "date",
    },
    {
      field: "e_initialSalary",
      headerName: "Salary",
      valueFormatter: (params) => `₹${params.value}`,
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: "Actions",
      minWidth: 140,
      maxWidth: 160,
      resizable: false,
      suppressSizeToFit: true,
      cellClass: styles["centered-cell"],
      cellRenderer: (params) => {
        return (
          <>
            <Button
              text="Edit"
              variant="primary"
              small={true}
              onClick={() => navigate(`/employee?id=${params.data._id}`)}
            />
            <Button text="Delete" variant="danger" small={true} onClick={() => handleDeleteEmployee(params.data._id)} />
          </>
        );
      },
    },
  ]);

  // Auto-size columns on grid ready
  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  // Handle window resize
  const onGridSizeChanged = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

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
      console.log(res.data.data);
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
      <div className={styles["table-responsive"]}>
        <div className={styles.gridContainer}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            theme={myTheme}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            onGridReady={onGridReady}
            onGridSizeChanged={onGridSizeChanged}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;
