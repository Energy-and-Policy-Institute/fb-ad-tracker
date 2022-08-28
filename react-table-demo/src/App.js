import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import Table from "./Table";
import styled from 'styled-components'
import "./App.css"

// -- components -- 

// styling for table
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

// custom component to render Genres 
const Genres = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

// -- app -- 

function App() {

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data);
    })();
  }, []);

  console.log(data)

  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "show.name"
          },
          {
            Header: "Type",
            accessor: "show.type"
          }
        ]
      },
      {
        // Second group - Details
        Header: "Details",
        // Second group columns
        columns: [
          {
            Header: "Language",
            accessor: "show.language"
          },
          {
            Header: "Genre(s)",
            accessor: 'show.genres',
            Cell: ({ cell: { value } }) => <Genres values={value} />
          },
          {
            Header: "Runtime",
            accessor: "show.runtime",
            // Cell method will provide the value of the cell; we can create a custom element for the Cell
            // Cell: ({ cell: { value } }) => {
            //   const hour = Math.floor(value / 60);
            //   const min = Math.floor(value % 60);
            //   return (
            //     <>
            //       {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
            //       {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
            //     </>
            //   );
            // }
          },
          {
            Header: "Status",
            accessor: "show.status"
          }
        ]
      }
    ],
    []
  );

  return (
    <div className="App">
      <Styles>
       <Table columns={columns} data={data} />
      </Styles>
    </div>
  );
}

export default App;