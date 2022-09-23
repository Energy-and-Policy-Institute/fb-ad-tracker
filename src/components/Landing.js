import React, { useMemo } from "react";
// import axios from 'axios';
import { useData } from "./Data/summary";
import Table from "../components/Table";
import styled from 'styled-components'
import { OutboundLink } from './Link'
import "../App.css"

// components
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0rem;
  margin-bottom: 0.5rem;
  padding: 0 0 0 0;
  font-family: "HelveticaNeue-Bold";
`;

const Subtitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 0rem;
  margin-bottom: 2rem;
  padding: 0 0 0 0;
`;

const Credit = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  color: black;
  margin-top: 1rem;
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
            accessor: row => row.name,
            Cell: (props) => {
              const pathUrl = props.row.original.url;
              const name = props.row.original.name;
              return (
                <>
                <OutboundLink to={pathUrl} from='/'>{name}</OutboundLink>
                </>
              )
            }
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
                  ${number1} - ${number2}
                </>
              )
            }
          }],
    []
  );

  return (
    <div className="App">
      <Title>Spending by Utility Front Group</Title>
      <Subtitle>Time Period: May 24, 2018 - September 20, 2022</Subtitle>
      <Table columns={columns} data={data.toJS()} />
      {/* <Credit>Facebook Ad Spending Tracker built by the <OutboundLink to="https://www.energyandpolicy.org" from="/">Energy and Policy Institute</OutboundLink>. Click <OutboundLink to="https://github.com/Energy-and-Policy-Institute/fb-ad-tracker" from='/'>here</OutboundLink> to access the methodology and source code. Having issues using the tool or want to make suggestions? Please <OutboundLink to="https://www.energyandpolicy.org/contact-us/" from="/">contact</OutboundLink> us.</Credit> */}
    </div>
  );
}

export default Landing
