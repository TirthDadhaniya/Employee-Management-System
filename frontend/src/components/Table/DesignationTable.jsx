import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { themeQuartz } from "ag-grid-community";
import axios from "axios";
import Button from "../Button/Button";
import styles from "./Table.module.css";

const DesignationTable = ({ title = "Table" }) => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
      headerName: "Designation",
      sortable: true,
      filter: true,
      flex: 1,
      // minWidth: 250,
      // maxWidth: 350,
      resizable: false,
    },
    {
      headerName: "Actions",
      minWidth: 300,
      resizable: false,
      cellClass: styles["centered-cell"],
      cellRenderer: (params) => {
        return (
          <>
            <Button
              text="Edit"
              variant="primary"
              small={true}
              onClick={() => navigate(`/designation?id=${params.data._id}`)}
            />
            <Button
              text="Delete"
              variant="danger"
              small={true}
              onClick={() => handleDeleteDesignation(params.data._id)}
            />
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

  async function fetchDesignations() {
    try {
      const res = await axios.get("http://localhost:3000/designations");
      setRowData(res.data.data);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  }

  useEffect(() => {
    fetchDesignations();
  }, []);

  // Delete logic
  const handleDeleteDesignation = async (designationId) => {
    if (!window.confirm("Are you sure you want to delete this designation?")) return;
    try {
      await axios.delete(`http://localhost:3000/designations/${designationId}`);
      fetchDesignations();
    } catch (error) {
      console.error("Error deleting designation:", error);
      alert("Failed to delete designation.");
    }
  };

  return (
    <>
      <h3 className={styles["section-header"]}>{title}</h3>
      <div className="table-responsive">
        <div style={{ height: 530, width: "100%" }}>
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

export default DesignationTable;
