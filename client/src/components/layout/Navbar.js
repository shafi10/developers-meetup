import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout } from '../../actions/auth'

const Navbar = ({ logout, auth: {isAuthenticated, loding}}) => {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<Link className="navbar-brand" to="/">Developers Join</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
{!isAuthenticated ? 
  <div className="navbar-nav ml-auto">
    <Link className="nav-link" to="/profiles">Developers</Link>
    <Link className="nav-link" to="/register">Register</Link>
    <Link className="nav-link" to="/login">Login</Link>
    </div> :
    <div className="navbar-nav ml-auto">
    <Link className="nav-link" to="/posts">Posts</Link>
    <Link className="nav-link" to="/dashboard" >Dashboard</Link>
    <Link className="nav-link" onClick={logout} to="#!" >Logout</Link>
  </div>
}
</div>
</nav>


    )
}

Navbar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
   auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);
