import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../../src/style.css'

// always destructure props to access immediately
const Alert = ({alerts}) => 
  alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key = { alert.id } className= { `alert alert-${alert.alertType}`}>
            { alert.msg }
    </div>
  ))


Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProp = state => ({
    alerts: state.alert  // to get the specific reducer from combineReducers
})

export default connect(mapStateToProp)(Alert) // no actions for this component just a function for param1

