import React,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem'
import { getAllProfiles } from '../../actions/profile'

const Profiles = ({getAllProfiles, profile:{profiles, loading}})=>{
    
    useEffect(()=>{
        getAllProfiles()
    },[getAllProfiles])
    
    return (
      <Fragment>
          {loading ? <Spinner /> : <Fragment>
               <h1 class="large text-primary"> Developers</h1>
             
              <div className="row">
               
                {profiles.length > 0 ? ( profiles.map(profile=>(
                    <div className="col-md-4">
                    <ProfileItem key={profile._id} profile={profile} />
                    </div>
                ))): <h4>no profiels found..</h4>}
              </div>
            
              
              </Fragment>}
      </Fragment>
    )
}

Profiles.propTypes ={
    getAllProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile
})

export default connect(mapStateToProps  , {getAllProfiles})(Profiles);