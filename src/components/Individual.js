import React, { useMemo } from "react";
import { graphql } from 'gatsby'
import Table from "../components/Table";
import "../App.css"
import { Map, fromJS, List } from "immutable";
import { useData } from "./Data/summary";
import styled from 'styled-components'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
// import { useIndividualData } from "./Data/individuals";

// components
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: black;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

const Subtitle = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  color: black;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

const Desc = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  color: black;
  margin-top: 2rem;
  padding: 0 0 0 0;
`;

const Return = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  color: black;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

export const query = graphql`
    query($pagePath: String!) {
      allIndividualJson(filter: {name: {eq: $pagePath}} ) {
        nodes {
          lowerAmount
          name
          upperAmount
          region
        }
      }
    }
`


const PageTemplate = (props) => {
  
  const data = props.data.allIndividualJson.nodes;

  const [frontGroupData] = useData()
  const frontGroup = frontGroupData.toJS()

  const filteredGroup = frontGroup.filter(val => val.name.includes(data[0].name))

  const adLink = "https://www.facebook.com/ads/library/?active_status=all&ad_type=political_and_issue_ads&country=US&view_all_page_id=" + filteredGroup[0].pageId + "&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all";
    
    const columns = useMemo(
        () => [{
                id: "region",
                Header: "State",
                accessor: row => row.region,
              },
              {
                id: "spent",
                Header: "Amount Spent",
                accessor: row => row.lowerAmount,
                Cell: (props) => {
                  const number1 = Math.round(props.row.original.lowerAmount).toLocaleString("en-US");
                  const number2 = Math.round(props.row.original.upperAmount).toLocaleString("en-US");
                  return (
                    <>
                     ${number1} - ${number2}
                    </>
                  )
                }
              }
            ],
        []
      );

      var groupName = data[0].name
      
    return (
    <div className="App">
      <Title>{groupName}</Title>
      <Subtitle>Spending by Region</Subtitle>
      <Subtitle>May 24, 2018 - September 7, 2022</Subtitle>
      <Desc>View {groupName}'s ads in the Facebook Ad Library <a href={adLink}>here</a>.</Desc>
      {/* <Return><a href="/"><MdOutlineKeyboardBackspace /> Go back </a></Return> */}
      <Table columns={columns} data={data} />
    </div>
    )
};

export default PageTemplate