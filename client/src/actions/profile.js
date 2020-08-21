import axios from 'axios'
import {setAlert} from './alert'

import { GET_PROFILE,GET_PROFILES ,DELETE_ACCOUNT,CLEAR_PROFILE, UPDATE_PROFILE,GET_REPOS, PROFILE_ERROR} from './types'

export const getCurrentProfile = ()=> async dispatch =>{
   try{
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
   }catch(error){
     dispatch({
         type:PROFILE_ERROR,
         payload: {msg: error.response.statusText, status:error.response.status}
     })
   }
}

//get all profiels
export const getAllProfiles = ()=> async dispatch =>{
  dispatch({type: CLEAR_PROFILE});
  try{
       const res = await axios.get('/api/profile');
       dispatch({
           type:GET_PROFILES,
           payload:res.data
       })
  }catch(error){
    dispatch({
        type:PROFILE_ERROR,
        payload:error
    })
  }
}


//get profiels by id
export const getProfileBYId = userId => async dispatch =>{
  try{
       const res = await axios.get(`/api/profile/user/${userId}`);
       console.log(res)
       dispatch({
           type:GET_PROFILE,
           payload:res.data
       })
  }catch(error){
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg: error.response.statusText, status:error.response.status}
    })
  }
}


//get github respos 
export const getGithubRepos = username => async dispatch =>{
  try{
       const res = await axios.get(`/api/profile/github/${username}`);

       dispatch({
           type:GET_REPOS,
           payload:res.data
       })
  }catch(error){
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg: error.response.statusText, status:error.response.status}
    })
  }
}


// create profile

export const createProfile = (formData, history , edit = false) =>  async dispatch=>{
  try{
  const config = {
    headesrs:{
      'Content-type':'application/json'
    }
  }

  const res =await axios.post('/api/profile', formData, config);
  
  dispatch({
    type:GET_PROFILE,
    payload:res.data
  });

  dispatch(setAlert(edit ? 'Profile Updated':'Profile Created', 'success'))
    if(!edit ){
      history.push('/dashboard')
    }
  }catch(error){
    const errors = error.response.data.errors;
   
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type:PROFILE_ERROR,
      payload: {msg: error.response.statusText, status:error.response.status}
  })
  }
} 

// add experience

export const addExperience =( formData , history) => async dispatch =>{
  try{
    const config = {
      headesrs:{
        'Content-type':'application/json'
      }
    }
  
    const res =await axios.put('/api/profile/experience', formData, config);
    
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    });
  
    dispatch(setAlert('Experience Updated', 'success'))
        history.push('/dashboard')

    }catch(error){
      const errors = error.response.data.errors;
     
      if(errors){
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
  
      dispatch({
        type:PROFILE_ERROR,
        payload: {msg: error.response.statusText, status:error.response.status}
    })
    }
}

// add education

export const addEducation =( formData , history) => async dispatch =>{
  try{
    const config = {
      headesrs:{
        'Content-type':'application/json'
      }
    }
  
    const res = await axios.put('/api/profile/education', formData, config);
    
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    });
  
    dispatch(setAlert('education added', 'success'))
        history.push('/dashboard')

    }catch(error){
      const errors = error.response.data.errors;
     
      if(errors){
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
  
      dispatch({
        type:PROFILE_ERROR,
        payload: {msg: error.response.statusText, status:error.response.status}
    })
    }
}

// delete an experience
 
export const deleteExperience = id =>async dispatch=>{
  try{
     const res = await axios.delete(`/api/profile/experience/${id}`)
     dispatch({
       type: UPDATE_PROFILE,
       payload:res.data
     });

     dispatch(
       setAlert('experience delete','success')
     )
  }catch(error){
    dispatch({
      type:PROFILE_ERROR,
      payload: {msg: error.response.statusText, status:error.response.status}
  })
  }
}

// delete education
 
export const deleteEducation = id =>async dispatch=>{
  try{
     const res = await axios.delete(`/api/profile/education/${id}`)
     dispatch({
       type: UPDATE_PROFILE,
       payload:res.data
     });

     dispatch(
       setAlert('Education delete','success')
     )
  }catch(error){
    dispatch({
      type:PROFILE_ERROR,
      payload: {msg: error.response.statusText, status:error.response.status}
  })
  }
}

//DELETE ACCOUNT
 
export const deleteAccount = () =>async dispatch=>{
  if(window.confirm('are you sure')){
    try{
       await axios.delete('/api/profile')
      dispatch({
        type: CLEAR_PROFILE});
        dispatch({
          type: DELETE_ACCOUNT});
 
      dispatch(
        setAlert('Account deleted')
      )
   }catch(error){
     dispatch({
       type:PROFILE_ERROR,
       payload: {msg: error.response.statusText, status:error.response.status}
   })
   }
  }
}