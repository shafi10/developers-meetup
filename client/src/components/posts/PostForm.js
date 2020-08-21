import React,{useState} from 'react'
import {connect } from 'react-redux'
import {addPost} from '../../actions/post'

const PostForm = ({addPost}) => {
     const [text, setText]= useState('');

    return (
        <div className="post-form">
        <div className="bg-secondary p-2 mt-3">
          <h3 className="text-center text-success">Post About Development...</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addPost({text});
            setText('')
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            className="col-md-6 mt-3 form-control"
            required
            value={text}
            onChange={e=> setText(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {

}

export default connect(null, {addPost})(PostForm)
