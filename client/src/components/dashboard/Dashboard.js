import React,{ Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {Link } from 'react-router-dom'
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { deleteAccount}  from '../../actions/profile'

const Dashboard = ({getCurrentProfile,deleteAccount,auth:{user}, profile:{profile, loading}}) => {

    useEffect(()=>{
        getCurrentProfile();
    }, [])
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large, text-primary"> Dashboard </h1>
<p className='lead'><i className="fas fa-user"></i>Welcome { user && user.name}</p>
  <div className="row">
   {
       profile !== null ? <Fragment>
           <div className="col-md-3">
           <DashboardActions />
           </div>
           <div className="col-md-9">
           <Experience experience={profile.experience}/>
           <Education education={profile.education}/>
       <div className="my-2" >
        <button onClick={()=>deleteAccount() } className=" btn btn-danger">
          Delete my Account
        </button>
       </div>
       </div>
       </Fragment> : <Fragment> 
           <p> You have not yet have a profile</p>
           <Link to ='/create-profile' className='btn btn-primary'>Create Profile </Link>
       </Fragment>
   }
   </div>
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
     auth: state.auth,
     profile:state.profile
})

export default connect(mapStateToProps, {getCurrentProfile,deleteAccount})(Dashboard)
