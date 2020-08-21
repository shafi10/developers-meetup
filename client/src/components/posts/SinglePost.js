import React,{useEffect} from 'react'
import {singlePost} from '../../actions/post'
import {useDispatch, useSelector} from 'react-redux'
import CommentForm from './CommentForm'
import Spinner from '../layout/Spinner'
import {deleteComment} from '../../actions/post'

const SinglePost = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{     
        dispatch(singlePost(props.match.params.id))
    },[dispatch(singlePost(props.match.params.id)),dispatch(deleteComment)])
    const {sglPost,loading} = useSelector(state => state.post)

     const auth = useSelector(state => state.auth);
    return loading || sglPost == null ? (<Spinner />) :(
        <div>
          <div class="card mt-4">
             <div class="card-header bg-success">
             Name: {sglPost.name}
            </div>
            <div class="card-body">
              <p class="card-text"><span className="text-info font-weight-bold">Question:</span> {sglPost.text}</p>
                <p>Publish Date: {sglPost.date}</p>
           </div>
           </div>
            <CommentForm postId={sglPost._id} />
            <div className="container">
                <div>
                    <h2 className="border-bottom mb-5">Answers</h2>
                </div>
                {sglPost.comments.map(comment =>
                    <div class="card">
                    <div class="card-body">
                     <h5>Name: {comment.name}</h5>                    
                     <p>Question: {comment.text}</p>
                      <p>Comment Date: {comment.date}</p>
                      {!auth.loading && comment.user=== auth.user._id && (
                    <button 
                       onClick={e => dispatch(deleteComment(sglPost._id,comment._id))}
                       type="button"
                       class="btn btn-danger" >
                      <i class="fas fa-times"></i>
                      </button>
                     )}
                    </div>
                  </div>
                )}
            </div>
        </div>
    )
}


export default SinglePost;
