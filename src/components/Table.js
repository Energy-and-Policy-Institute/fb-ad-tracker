import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";

export default function Table({ columns, data }) {

  // Create a state
  const [filterInput, setFilterInput] = useState("");

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter // The useFilter Hook provides a way to set the filter
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useSortBy
  );

  // Update the state when input changes
  const handleFilterChange = e => {
    const value = e.target.value || "" ;
    setFilter("name", value);
    setFilterInput(value);
  };

  return (
    <>
      {/* <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search front group"}
      /> */}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return ( <td {...cell.getCellProps()}>{cell.render("Cell")}</td> );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}