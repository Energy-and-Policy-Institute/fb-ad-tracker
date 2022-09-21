import React from 'react'
import PropTypes from 'prop-types'

const OutboundLink = ({ to, from, target, children, className }) => (
  <a
    href={to}
    target={target}
    className={className}
    rel="noopener"
    onClick={() => {
    }}
  >
    {children}
  </a>
)

OutboundLink.propTypes = {
  to: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

OutboundLink.defaultProps = {
  target: `_blank`,
  className: ``,
}

export default OutboundLink