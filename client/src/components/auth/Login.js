import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login } from '../../actions/auth'

const Login =({login, isAuthenticated}) =>{
   
    const [formData, setFormData ] = useState({
        email:'',
        password:''
    });
     
    const {email , password} = formData
   const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
   const onSubmit = async e => {
       e.preventDefault();
       
          login(email, password)
   }


      //redirect if logged in

      if(isAuthenticated){
        return <Redirect to='/Dashboard' />
      }
    return (

        <Fragment>
            <h1 className="large text-secondary mt-5">Sign In</h1>
      <p className="lead"><i className="fas fa-user mt-3"></i> Sign into Your Account</p>
      <form  onSubmit = {e => onSubmit(e)}>
          <div class="form-row">
           <div class="col">
             <input type="text" className="form-control" 
             name="email"
             value = {email}
             onChange = {e => onChange(e)}
             required
             placeholder="Email" />
          </div>
          <div class="col">
          <input type="password" class="form-control" 
            name="password"
            minLength="6"
            value = {password}
            onChange = {e => onChange(e)}
            placeholder="Password" />
         </div>
         
       </div>
       <input type="submit" className="btn btn-secondary mt-3" value="Login" />
     </form>
      <p className="my-1 mt-2">
        Not have an account? <Link to='/register'>Sign Up</Link>
      </p>
        </Fragment>
    )
}

Login.propTypes ={
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)
