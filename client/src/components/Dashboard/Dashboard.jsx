import React from 'react'
import PropTypes from 'prop-types'
import useAuth from '../../hooks/useAuth/useAuth'

export default function Dashboard ({ code }) {
  const accessToken = useAuth(code)
  return <div>{code}</div>
}

Dashboard.propTypes = {
  code: PropTypes.node.isRequired
}
