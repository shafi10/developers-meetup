import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import {connect } from 'react-redux'
import {addEducation } from '../../actions/profile'


const AddEducation = ({ addEducation, history}) =>{

     
    const [formData, setFormData] = useState({
        school:'',
        degree:''
    })

    const {
        school,
        degree
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})
    return (
      <Fragment>
          <h1 class="large text-primary">
       Add your Educaton
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={ e=>{
        e.preventDefault()
        addEducation(formData , history);
      }
      }>
        <div class="form-group">
          <input type="text" placeholder="* School" name="school" className="form-control" value={school} onChange ={ e => onChange(e)} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Degree" name="degree" className="form-control" value={degree} onChange ={ e => onChange(e)} required />
        </div>      
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
      </Fragment>
    )
}

AddEducation.propTypes={
 addEducation:PropTypes.func.isRequired
}

export default connect(null, { addEducation})(withRouter(AddEducation))



