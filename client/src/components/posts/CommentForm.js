import React,{useState} from 'react'
import {addComment} from '../../actions/post'
import { useDispatch} from 'react-redux'

const CommentForm = (props) => {
    const [text, setText]= useState('');
    const dispatch = useDispatch()
    return (
        <div>
            <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            dispatch(addComment(props.postId,{text}));
            setText('')
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Make a comment"
            className="col-md-6 mt-3 form-control"
            required
            value={text}
            onChange={e=> setText(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Answer" />
        </form>
        </div>
    )
}

export default CommentForm
