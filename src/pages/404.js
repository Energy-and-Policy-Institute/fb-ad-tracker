import React from "react"
import SEO from "../components/SEO"
import { OutboundLink } from '../components/Link'
import styled from 'styled-components'

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

const NotFoundPage = () => (
  <div>
    <SEO title="404: Not found" />
    <Title>404: Not Found</Title>
    <Subtitle>We don't a landing page for this front group yet. Want to us help us? Please share suggestions or comments <OutboundLink to="https://www.energyandpolicy.org/contact-us/" from="/">here</OutboundLink>.</Subtitle>
  </div>
)

export default NotFoundPage