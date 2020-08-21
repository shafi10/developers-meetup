import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux'
import {addExperience } from '../../actions/profile'


const AddExperience = ({ addExperience, history}) =>{

     
    const [formData, setFormData] = useState({
        company:'',
        title:''
    })

    const {
        company,
        title
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})
    return (
      <Fragment>
          <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={ e=>{
        e.preventDefault()
        addExperience(formData , history);
      }
      }>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" className="form-control" name="title" value={title} onChange ={ e => onChange(e)} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" className='form-control' value={company} onChange ={ e => onChange(e)} required />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
      </Fragment>
    )
}

AddExperience.propTypes={
 addexperience:PropTypes.func.isRequired
}

export default connect(null, { addExperience})(AddExperience)



