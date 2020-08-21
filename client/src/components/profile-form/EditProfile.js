import React, { useState, Fragment , useEffect} from 'react'
import {connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {createProfile, getCurrentProfile} from '../../actions/profile'

const EditProfile = ({profile:{ profile, loading},createProfile,getCurrentProfile, history} ) =>{
     
    const [formData , setFormData] = useState({
        company:'',
        location:'',
        skills:'',
        status:'',
        linkedin:'',
        youtube:''
    });

    const  [ displaySocialInput, toggleSocialInput] = useState(false)

       useEffect(()=>{
           getCurrentProfile();
           setFormData({
               company: loading || !profile.company ? '' : profile.company,
               location: loading || !profile.location ? '' : profile.location,
               status: loading || !profile.status ? '' : profile.status,
               skills: loading || !profile.skills ? '' : profile.skills.join(','),
               linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
               youtube: loading || !profile.youtube ? '' : profile.youtube,
            })
       }, [loading,getCurrentProfile])
      
    const { company,
    location,
    skills,
    status,
    linkedin,
    youtube } = formData

     const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

     const onSubmit = e =>{
          e.preventDefault();
          createProfile(formData, history, true)
     }

    return (
       <Fragment>
            <h1 className="large text-secondary mt-5 mb-3">
                  Update Your Profile
            </h1>
      <form className="form" onSubmit= {e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" class="form-control"   value={status} onChange={e=>onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" className="form-control" name="company" value ={company}  onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" className="form-control" name="location" value ={location}  onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" className="form-control" name="skills" value ={skills}  onChange={e=>onChange(e)}/>
        </div>

        <div className="my-2">
          <button type="button" onClick ={()=> toggleSocialInput(!displaySocialInput)} className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInput && <Fragment>

        <div className="form-group social-input">
          <i className="f-2x"></i>
          <input type="text" placeholder="YouTube URL" className="form-control" name="youtube" value ={youtube}  onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" className="form-control" name="linkedin" value ={linkedin}  onChange={e=>onChange(e)}/>
        </div>
            </Fragment>}
           
        
        <input type="submit" className="btn btn-secondary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Dashboard</Link>
      </form>
       </Fragment>
    )
}

EditProfile.propTypes ={
   EditProfile:PropTypes.func.isRequired,
   profile:PropTypes.object.isRequired,
   getCurrentProfile:PropTypes.func.isRequired
}


const mapStateToProps = state =>({
   profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile))