import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {setAlert} from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

const Register =({setAlert , register, isAuthenticated}) =>{
   
    const [formData, setFormData ] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
     
    const {name ,email , password, password2} = formData
   const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
   const onSubmit = async e => {
       e.preventDefault();
       if(password !== password2 ){
           setAlert('Password do not match', 'danger')
       }else{
           register({name, email ,password });
       }
   }


   if(isAuthenticated){
    return <Redirect to='/Dashboard' />
  }


    return (

        <Fragment>
            <h1 className="large text-secondary mt-5">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit = {e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name"
          className="form-control"
          value = {name}
          onChange = {e => onChange(e)}
          required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"
          className="form-control"
          value = {email}
          onChange = {e => onChange(e)}
          required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            className="form-control"
            value = {password}
          onChange = {e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            className="form-control"
            value = {password2}
          onChange = {e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-secondary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
        </Fragment>
    )
};

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})

Register.propTypes = {
  setAlert :PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};


export default connect(mapStateToProps, {setAlert, register})(Register);
