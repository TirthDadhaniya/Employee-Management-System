import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import "./List.css";
import EmployeeTable from "../../components/Table/EmployeeTable";
import SalaryTable from "../../components/Table/SalaryTable";

function List() {
  return (
    <>
      <Header />
      <div className="split-container">
        <section className="list-section flex-1">
          <EmployeeTable title="All Employees" />
          <br className="mt-20" />
          <SalaryTable title="All Salary Entries" />
        </section>
      </div>
    </>
  );
}
export default List;
