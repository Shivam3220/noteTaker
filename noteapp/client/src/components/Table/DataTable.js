import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
// import { TableColums, } from "./TableColumn";
import { BsSortAlphaDownAlt, BsSortAlphaDown } from "react-icons/bs";
import Globalfilter from "./Globalfilter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'

const DataTable = ({
  Tdata,
  TableColums,
  tableParams,
  delApi,
  fetchData,
  updataApi,
}) => {

  const columns = useMemo(() => TableColums, []);
  const closeModal = useRef();
  const [EditEntity, setEditEntity] = useState(tableParams);

  // const data = useMemo(() => Tdata, []);
  const id = useSelector((state) => state.user.id)

  const [List, setList] = useState([1]);

  const tableData = useTable(
    {
      columns: columns,
      data: Tdata,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    pageCount,
    gotoPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
  } = tableData;

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    const ls = [];
    for (let i = 0; i < pageCount; i++) {
      ls.push(i);
    }
    setList(ls);
  }, [pageSize, globalFilter]);

  const onDelClick = async () => {
    const data = { id: EditEntity._id , "user_id":id };
    try {
      const dataFetch = await fetch(delApi, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const jsonRes = await dataFetch.json();
      if (jsonRes.code === 200) {
        closeModal.current.click();
        fetchData();
        toast.success(jsonRes.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) { }
  };

  const onSaveChangeClick = async () => {
    try {
      const dataFetch = await fetch(updataApi, {
        method: "POST",
        body: JSON.stringify({...EditEntity,"user_id":id}),
        headers: {
          "Content-type": "application/json",
        },
      });
      const jsonRes = await dataFetch.json();
      if (jsonRes.code === 200) {
        closeModal.current.click();
        fetchData();
        toast.success(jsonRes.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) { }
  };


 

  return (
    <div className="w-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="d-flex justify-content-between">
        <div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="m-2 px-2"
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          entities per page
        </div>
        <Globalfilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="table table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>S.No.</th>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className=""
                >
                  <span className="d-flex">
                    <p>{column.render("Header")}</p>
                    <span className="d-flex flex-column mx-4 fs-4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <BsSortAlphaDownAlt className="" />
                        ) : (
                          <BsSortAlphaDown className="" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                    {/* {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''} */}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                style={{ cursor: "pointer" }}
                {...row.getRowProps()}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                  setEditEntity({ ...EditEntity, ...row.original });
                }}
              >
                <td>{row.index + 1}</td>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mx-2">
        <div>
          <h5>
            {pageCount && pageCount > 0
              ? `Showing ${pageIndex + 1} to ${pageCount}`
              : ""}
          </h5>
        </div>
        <div className="datatable-bottom">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  onClick={previousPage}
                  aria-label="Previous"
                  disabled={!canPreviousPage}
                  className={`page-link ${!!(canPreviousPage - 1) ? "bg-secondary-subtle " : ""
                    }`}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {List.map((e, index) => {
                return (
                  <li key={index} className={`page-item`}>
                    <button
                      className={`page-link ${pageIndex + 1 === index + 1 ? "bg-info" : ""
                        }`}
                      value={index + 1}
                      onClick={(e) => {
                        gotoPage(e.target.value - 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              })}
              <li className="page-item">
                <button
                  onClick={nextPage}
                  disabled={!canNextPage}
                  aria-label="Next"
                  className={`page-link ${!canNextPage ? "bg-secondary-subtle " : ""
                    }`}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* modal code here */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {/* Edit--{editProduct.data.product} */}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="my-4">
                  <div className="mb-3 row dropdown-center flex-fill col dropdown">
                    <label
                      htmlFor="ProductName"
                      className="col-sm-3 col-form-label text-center"
                    >
                      {Object.keys(tableParams)[0]}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="product"
                        placeholder="Product Name"
                        value={EditEntity[Object.keys(tableParams)[0]]}
                        onChange={(e) => {
                          setEditEntity({
                            ...EditEntity,
                            [Object.keys(tableParams)[0]]: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="mrp"
                      className="col-sm-3  col-form-label text-center"
                    >
                    
                      {Object.keys(tableParams)[1]}
                    </label>
                    <div className="col-sm-6">
                      <textarea 
                        type="textarea"
                        rows={4}
                        className="form-control"
                        placeholder="Description"
                        value={EditEntity[Object.keys(tableParams)[1]]}
                        onChange={(e) => {
                          setEditEntity({
                            ...EditEntity,
                            [Object.keys(tableParams)[1]]: e.target.value,
                          });
                        }}
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* <div className="mb-3 row">
                    <label
                      htmlFor="mrp"
                      className="col-sm-3  col-form-label text-center"
                    >
                      {Object.keys(tableParams)[2]}

                    </label>
                    <div className="col-sm-6">
                      <input
                        type="date"
                        className="form-control"
                        id="mrp"
                        placeholder="date"
                        value={EditEntity[Object.values(tableParams)[2]]}
                        onChange={(e) => {
                          setEditEntity({
                            ...EditEntity,
                            [Object.keys(tableParams)[2]]: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                  </div> */}

                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info text-black fw-bold border border-dark mx-2"
                onClick={() => {
                  onDelClick();
                }}
              >
                Delete Note
              </button>
              <button
                type="button"
                className="btn btn-info text-black fw-bold border border-dark mx-2"
                onClick={() => onSaveChangeClick()}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
    </div>
  );
};

export default DataTable;

{
  /* <>
    <div className="datatable-info">Showing 1 to 10 of 57 entries</div>
    <nav className="datatable-pagination"><ul className="datatable-pagination-list"><li className="datatable-pagination-list-item datatable-hidden datatable-disabled"><a data-page="1" className="datatable-pagination-list-item-link">‹</a></li><li className="datatable-pagination-list-item datatable-active"><a data-page="1" className="datatable-pagination-list-item-link">1</a></li><li className="datatable-pagination-list-item"><a data-page="2" className="datatable-pagination-list-item-link">2</a></li><li className="datatable-pagination-list-item"><a data-page="3" className="datatable-pagination-list-item-link">3</a></li><li className="datatable-pagination-list-item"><a data-page="4" className="datatable-pagination-list-item-link">4</a></li><li className="datatable-pagination-list-item"><a data-page="5" className="datatable-pagination-list-item-link">5</a></li><li className="datatable-pagination-list-item"><a data-page="6" className="datatable-pagination-list-item-link">6</a></li><li className="datatable-pagination-list-item"><a data-page="2" className="datatable-pagination-list-item-link">›</a></li></ul></nav>
</> */
}
