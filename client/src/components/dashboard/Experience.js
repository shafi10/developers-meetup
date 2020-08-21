import React, {Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteExperience}  from '../../actions/profile'

const Experience = ({ experience,deleteExperience }) =>{
    return (
        <Fragment>
       <h2 className="my-2"> Experience </h2>
         {  experience.map(exp =>
             <ul class="list-group">
                 <li class="list-group-item">Company: {exp.company}</li>
                 <li class="list-group-item">Title: {exp.title}</li>
                 <li class="list-group-item"><button onClick={()=> deleteExperience(exp._id)} className="btn btn-danger"> Delete </button></li>
             </ul> )}
            </Fragment>
    )
}

Experience.propTypes ={
  experience: PropTypes.array.isRequired,
  deleteExperience:PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience)