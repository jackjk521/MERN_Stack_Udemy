import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education: { school, degree, fieldofstudy, to, from, description}}) => {
  return (
        <div>
            <h3 class="text-dark">{school}</h3>
            <p>
                <Moment formant='YYYY/MM/DD'>{ from }</Moment> - {!to ? 'Now' : <Moment formant='YYYY/MM/DD'> {to} </Moment> } 
            </p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field of Study: </strong>{fieldofstudy}</p>
            <p>
            <strong>Description: </strong>{ description }
            </p>
    </div>
  )
}

ProfileEducation.propTypes = {

}

export default ProfileEducation
