import React, { useState } from "react";
import DashTable from "../components/DashTable";

const Expense = () => {
  const [TableColums, setTableColums] = useState([
    {
      Header: "Title",
      accessor: "Title",
    },
    {
      Header: "Description",
      accessor: "Description",
    },
    {
      Header: "Date",
      accessor: "Date",
    },
  ]);

  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Notes</h1>
        <DashTable
          heading={"Notes"}
          tableParams={{ Title: "", Description: "",Date:"" }}
          updataApi="http://127.0.0.1:5002/notes/update-note"
          delApi="http://127.0.0.1:5002/notes/delete-note"
          api="http://127.0.0.1:5002/notes/get-notes"
          AddApi={"http://127.0.0.1:5002/notes/add-note"}
          TableColums={TableColums}
        />
      </div>

   
    </>
  );
};

export default Expense;
