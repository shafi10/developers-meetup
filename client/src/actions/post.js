import axios from 'axios';
import {setAlert} from './alert'
import { GET_POSTS,ADD_COMMENT,REMOVE_COMMENT, POST_ERROR,GET_POST, UPDATE_LIKES, DELETE_POST, ADD_POST} from './types';



export const singlePost = id => async dispatch =>{
     try {
       const {data} = await axios.get('/api/posts/single/' +id);
       dispatch({
         type:GET_POST,
         payload:data
       })
     } catch (error) {
      dispatch({
        type:POST_ERROR,
        payload: {msg: error.response.statusText, status:error.response.status}
    })
     }
}

export const getPosts = ()=> async dispatch =>{
   try {
        const res = await axios.get('api/posts');

        dispatch({
            type:GET_POSTS,
            payload:res.data
        })

   } catch (error) {
       dispatch({
         type:POST_ERROR,
         payload: {msg: error.response.statusText, status:error.response.status}
     })
   }
}

//add like
export const addLike = id => async dispatch =>{
  try {
       const res = await axios.put(`api/posts/like/${id}`);

       dispatch({
           type:UPDATE_LIKES,
           payload:{id, likes: res.data}
       })

  } catch (error) {
      dispatch({
        type:POST_ERROR,
        payload: {msg: error.response.statusText, status:error.response.status}
    })
  }
}

//remove like
export const removeLike = id => async dispatch =>{
  try {
       const res = await axios.put(`api/posts/unlike/${id}`);

       dispatch({
           type:UPDATE_LIKES,
           payload:{id, likes: res.data}
       })

  } catch (error) {
      dispatch({
        type:POST_ERROR,
        payload: {msg: error.response.statusText, status:error.response.status}
    })
  }
}


//delete post
export const deletePost = id => async dispatch =>{
  try {
       const res = await axios.delete(`api/posts/${id}`);

       dispatch({
           type:DELETE_POST,
           payload:id
       })

       dispatch(
         setAlert('Post Removed', 'success'));

  } catch (error) {
      dispatch({
        type:POST_ERROR,
        payload: {msg: error.response.statusText, status:error.response.status}
    })
  }
}


//add post
export const addPost = formData => async dispatch =>{
    
  const config = {
    headers:{'Cantent-Type': 'application/json'}
  }
 
  try {
       const res = await axios.post('api/posts',formData, config);

       dispatch({
           type:ADD_POST,
           payload:res.data
       })

       dispatch(
         setAlert('Post Created', 'success'));

  } catch (error) {
    dispatch({
      type:POST_ERROR,
      payload: {msg: error.response.statusText, status:error.response.status}
  })
  }
}

export const addComment =(postId, formData) => async dispatch =>{
  const config = {
    headers:{'Cantent-Type': 'application/json'}
  } 

  try {
    const {data} = await axios.post('/api/posts/comment/'+postId, formData,config)
   dispatch({
     type:ADD_COMMENT,
     payload:data
   })

  } catch (error) {
    dispatch({
      type:POST_ERROR,
      payload:error
    })
  }
}

export const deleteComment = (id,commentId) => async dispatch =>{
  try {
    const {data} = await axios.delete(`/api/posts/comment/${id}/${commentId}`)
    dispatch({
      type:REMOVE_COMMENT,
      payload:commentId
    })
  } catch (error) {
    dispatch({
      type:POST_ERROR,
      payload:error
    })
  }
}