import React, { useMemo } from "react";
import { graphql } from 'gatsby'
import Table from "../components/Table";
import "../App.css"
import { Map, fromJS, List } from "immutable";
import { useData } from "./Data/summary";
import styled from 'styled-components'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { OutboundLink } from './Link'
// import { useIndividualData } from "./Data/individuals";

// components

const Desc = styled.h1`
  font-size: 19px;
  font-weight: 400;
  line-height: 32px;
  margin-top: 0.5rem;
  padding: 0 0 0 0;
  @media (max-width: 600px) {
    font-weight: 24px;
  };
`;

const Credit = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  color: black;
  margin-top: 1rem;
  padding: 0 0 0 0;
  @media (max-width: 600px) {
    font-weight: 24px;
  };
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

      var groupName = data[0].name;
      var count = filteredGroup[0].ads.toLocaleString("en-US");
      var spend = filteredGroup[0].lowerAmount.toLocaleString("en-US");
      
    return (
    <div className="App">
      <Desc>Between May 24, 2018 and November 14, 2022, {groupName} ran {count} ad(s) across Meta's platforms, spending over ${spend}. To see the original ads from the Facebook Ad Library, click <OutboundLink to={adLink} from='/'>here</OutboundLink>.
      <br></br><br></br>
      Read our <OutboundLink from="/" to="https://www.energyandpolicy.org/utility-front-groups-spending-on-disinformation-advertising">report that analyzes</OutboundLink> these front group advertisements. View our methodology and source code <OutboundLink from="/" to="https://github.com/Energy-and-Policy-Institute/fb-ad-tracker">here</OutboundLink>.
      <br></br><br></br>
      Below is its ad spend by region:</Desc>
      {/* <Return><a href="/"><MdOutlineKeyboardBackspace /> Go back </a></Return> */}
      <Table columns={columns} data={data} />
      <Credit>Tool built by <OutboundLink to="https://www.energyandpolicy.org/shelby-green/" from="/">Shelby Green</OutboundLink> with the Energy and Policy Institute. Having issues using the tool or want to make a suggestion? Please <OutboundLink to="https://www.energyandpolicy.org/contact-us/" from="/">contact</OutboundLink> us!</Credit>
    </div>
    )
};

export default PageTemplate