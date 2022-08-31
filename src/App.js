import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import Table from "./Table";
import styled from 'styled-components'
import "./App.css"

// components
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: black;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

const Subtitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  color: black;
`;

const Section = styled.h3`
  font-size: 1.50rem;
  font-weight: 500;
  color: black;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

const SmallSection = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  color: black;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

function App() {

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios.get("table1.json");
      // https://api.tvmaze.com/search/shows?q=snow
      // table1.json
      setData(result.data);
    })();
  }, []);

  // console.log(data)

  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
  const columns = useMemo(
    () => [{
            id: "name",
            Header: "Name",
            accessor: row => row.name
          },
          {
            id: "ads",
            Header: "Ads Ran",
            accessor: row => row.ads,
            Cell: ({ cell: { value } }) => {
              const number = value.toLocaleString("en-US");
              return (
                <>
                  {number}
                </>
              )
            }
          },
          {
            id: "spent",
            Header: "Amount Spent",
            accessor: row => row.spending,
            Cell: ({ cell: { value } }) => {
              const number = value.toLocaleString("en-US");
              return (
                <>
                  ${number}
                </>
              )
            }
          }],
    []
  );

  return (
    <div className="App">
      <Title>Front Group Spending Tracker</Title>
      <Subtitle>Explore how much front groups are spending on ads about social issues, elections or politics across Meta technologies.</Subtitle>
      <Section>Spending by Front Group</Section>
      <SmallSection>May 7, 2018 - August 27, 2022</SmallSection>
      <Subtitle>See spending totals by specific Front Groups. You can sort the results.</Subtitle>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;