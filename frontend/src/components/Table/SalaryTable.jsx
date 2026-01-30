import { forwardRef, useImperativeHandle, useState as useFilterState } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { themeQuartz } from "ag-grid-community";
import axios from "axios";
import Button from "../Button/Button";
import styles from "./Table.module.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Custom Month Filter Component
const MonthFilter = forwardRef((props, ref) => {
  const [filterType, setFilterType] = useFilterState("none");
  const [fromMonth, setFromMonth] = useFilterState("");
  const [toMonth, setToMonth] = useFilterState("");

  useImperativeHandle(ref, () => ({
    doesFilterPass(params) {
      const monthValue = params.data.month;
      const monthIndex = MONTHS.indexOf(monthValue) + 1;

      if (filterType === "none" || !fromMonth) return true;

      const from = parseInt(fromMonth, 10);
      const to = parseInt(toMonth, 10) || 12;

      if (filterType === "equals") {
        return monthIndex === from;
      } else if (filterType === "from") {
        return monthIndex >= from;
      } else if (filterType === "to") {
        return monthIndex <= from;
      } else if (filterType === "range") {
        return monthIndex >= from && monthIndex <= to;
      }
      return true;
    },

    isFilterActive() {
      return filterType !== "none" && fromMonth !== "";
    },

    getModel() {
      if (!this.isFilterActive()) return null;
      return { filterType, fromMonth, toMonth };
    },

    setModel(model) {
      if (model) {
        setFilterType(model.filterType || "none");
        setFromMonth(model.fromMonth || "");
        setToMonth(model.toMonth || "");
      } else {
        setFilterType("none");
        setFromMonth("");
        setToMonth("");
      }
    },
  }));

  const onFilterChange = () => {
    props.filterChangedCallback();
  };

  return (
    <div style={{ padding: 10, minWidth: 200 }}>
      <div style={{ marginBottom: 8 }}>
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            if (e.target.value === "none") {
              setFromMonth("");
              setToMonth("");
            }
            setTimeout(onFilterChange, 0);
          }}
          style={{ width: "100%", padding: 5 }}
        >
          <option value="none">No Filter</option>
          <option value="equals">Equals</option>
          <option value="from">From (≥)</option>
          <option value="to">To (≤)</option>
          <option value="range">Range</option>
        </select>
      </div>

      {filterType !== "none" && (
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 12 }}>{filterType === "range" ? "From:" : "Month:"}</label>
          <select
            value={fromMonth}
            onChange={(e) => {
              setFromMonth(e.target.value);
              setTimeout(onFilterChange, 0);
            }}
            style={{ width: "100%", padding: 5 }}
          >
            <option value="">Select Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>
      )}

      {filterType === "range" && (
        <div>
          <label style={{ fontSize: 12 }}>To:</label>
          <select
            value={toMonth}
            onChange={(e) => {
              setToMonth(e.target.value);
              setTimeout(onFilterChange, 0);
            }}
            style={{ width: "100%", padding: 5 }}
          >
            <option value="">Select Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
});

const SalaryTable = ({ title = "Table" }) => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "e_id",
      headerName: "Name",
      sortable: true,
      filter: true,
      flex: 1,
      // minWidth: 250,
      maxWidth: 350,
      valueGetter: (params) => params.data.e_id?.e_name || "No Name",
    },
    {
      field: "month",
      headerName: "Month",
      sortable: true,
      filter: MonthFilter,
      flex: 1,
      // minWidth: 250,
      maxWidth: 300,
      resizable: false,
      // Sort by month order (Jan=1, Dec=12)
      comparator: (a, b) => {
        const aIndex = MONTHS.indexOf(a);
        const bIndex = MONTHS.indexOf(b);
        return aIndex - bIndex;
      },
    },
    {
      field: "year",
      headerName: "Year",
      sortable: true,
      filter: true,
      flex: 1,
      // minWidth: 250,
      maxWidth: 300,
      resizable: false,
    },
    {
      field: "salary",
      headerName: "Salary",
      valueFormatter: (params) => `₹${params.value}`,
      sortable: true,
      filter: true,
      flex: 1,
      // minWidth: 250,
      maxWidth: 300,
      resizable: false,
    },
    {
      headerName: "Actions",
      // minWidth: 250,
      maxWidth: 250,
      resizable: false,
      cellClass: styles["centered-cell"],
      cellRenderer: (params) => {
        return (
          <>
            <Button
              text="Edit"
              variant="primary"
              small={true}
              onClick={() => navigate(`/salary?id=${params.data._id}`)}
            />
            <Button
              text="Delete"
              variant="danger"
              small={true}
              onClick={() => handleDeleteSalaryEntry(params.data._id)}
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

  async function fetchSalaryEntries() {
    try {
      const res = await axios.get("http://localhost:3000/salary-entries");
      setRowData(res.data.data);
    } catch (error) {
      console.error("Error fetching salary entries:", error);
    }
  }

  useEffect(() => {
    fetchSalaryEntries();
  }, []);

  // Delete logic
  const handleDeleteSalaryEntry = async (entryId) => {
    if (!window.confirm("Are you sure you want to delete this salary entry?")) return;
    try {
      await axios.delete(`http://localhost:3000/salary-entries/${entryId}`);
      fetchSalaryEntries();
    } catch (error) {
      console.error("Error deleting salary entry:", error);
      alert("Failed to delete salary entry.");
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

export default SalaryTable;
