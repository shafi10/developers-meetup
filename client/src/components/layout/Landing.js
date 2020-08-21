import React from 'react';
import { Redirect} from 'react-router-dom';
import {connect } from 'react-redux'
import PropTypes from 'prop-types';
import dev from './dev.jpg'; 


export const Landing = ({isAuthenticated}) => {
   
  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }
    return (
        <section className="landing  text-center">
          <div className="inner-lead">
          <p className="leads">
            This is a online platform for javaScript developers.They can find any type of development helps from senior developers.</p>
          <img src = {dev} style= {{width:'100%', margin:'auto', display:'block'} } alt='Loading' />
          </div>
        </section>
    )
}

Landing.propTypes = {
  isAuthenticated:PropTypes.bool
}

const mapStateToProps = state =>({
     isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);