import React, {Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteEducation}  from '../../actions/profile'

const Education = ({ education,deleteEducation }) =>{
    return (
        <Fragment>
           <h2 className="my-2"> Education </h2>
         {  education.map(edu =>
             <ul class="list-group">
                 <li class="list-group-item">School: {edu.school}</li>
                 <li class="list-group-item">Degree: {edu.degree}</li>
                 <li class="list-group-item"><button onClick={()=> deleteEducation(edu._id)} className="btn btn-danger"> Delete </button></li>
             </ul> )}
            </Fragment>
    )
}

Education.propTypes ={
  education: PropTypes.array.isRequired,
  deleteEducation:PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)