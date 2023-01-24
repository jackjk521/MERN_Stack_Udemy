import React, { Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from "../layout/Spinner";
import { connect } from 'react-redux'
import { getAllProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ getAllProfiles, profile: { profiles, loading}}) => {
  useEffect(() => {
    getAllProfiles()
  }, [getAllProfiles])
    return <Fragment>
        {
            loading ? <Spinner /> :
            <Fragment>
                <h1 className="large text-primary"> Developers </h1>
                <p className="lead">
                    Browse and Connect with developers
                </p>
                <div className="profiles">
                    {
                        profiles.length > 0 ? (
                            profiles.map(profile => (
                                <ProfileItem key= {profile.prof_id} profile={profile}></ProfileItem>
                            ))
                        ) :  <h4> No profiles found </h4>
                    }
                </div>
            </Fragment>
        }
    </Fragment>
  
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getAllProfiles })(Profiles)
