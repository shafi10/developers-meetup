import React from 'react';
import { Link } from 'react-router-dom'

const DashboardActions = () =>{
    return (
        <div class="dash-buttons">
        <Link to="/edit-profile" class="btn btn-light"><i class="far fa-user-circle text-dark"></i> Edit Profile</Link>
        <Link to="/add-experience" class="btn btn-light"
          ><i class="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="/add-education" class="btn btn-light"
          ><i class="fas fa-university text-primary"></i> Add Education</Link>
      </div>
    )
}

export default DashboardActions