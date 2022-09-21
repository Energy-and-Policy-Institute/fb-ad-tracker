import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

const Link = ({ to, from, children, className }) => (
  <GatsbyLink
    to={to}
    className={className}
    onClick={() => {
    }}
  >
    {children}
  </GatsbyLink>
)

Link.propTypes = {
  to: PropTypes.string.isRequired,
  from: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

Link.defaultProps = {
  className: ``,
  from: `unnamed link`,
}

export default Link