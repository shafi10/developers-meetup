import React from 'react';


const ProfileItem = ({ profile:{user:{_id, name, avatar}, status, company, location, skills}}) =>{
   return (
    
        <div className="card" >
          <img src={avatar} class="card-img-top" alt="..." />
         <div className="card-body">
            <h2><span className="text-success">Name:</span> {name}</h2>
           <p>{status} {company && <span className="text-warning"> at {company}</span>}</p>
           <p> {location && <span> at {location}</span>}</p>
           <div>
              <p className="border-bottom">Skills</p>
           {skills.slice(0, 4).map((skill, index)=>(
                <p key={index} className="text-primary">
                 <i className="fas fa-hand-point-right" />{ skill }
                </p>
            ))}
           </div>
         </div>
        </div>
       
   );
}
 
export default ProfileItem