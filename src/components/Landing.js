import React, { useMemo, useState, useEffect } from "react";
// import axios from 'axios';
import { useData } from "./Data/summary";
import Table from "../components/Table";
import styled from 'styled-components'
import "../App.css"

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

const Landing = () => {
    
    // data variable, as an immutable object
    const [data] = useData()

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
            accessor: row => row.lowerAmount,
            Cell: (props) => {
              const number1 = props.row.original.lowerAmount.toLocaleString("en-US");
              const number2 = props.row.original.upperAmount.toLocaleString("en-US");
              return (
                <>
                  ${number1}-{number2}
                </>
              )
            }
          }],
    []
  );

  return (
    <div className="App">
      <Table columns={columns} data={data.toJS()} />
    </div>
  );
}

export default Landing
