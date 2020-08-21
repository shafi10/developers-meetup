import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect } from 'react-redux'
import {addLike, removeLike, deletePost} from '../../actions/post'

const PostItem = ({auth,addLike,removeLike , deletePost, post:{_id, text, name,avatar, user,likes,comments, date}, showActions}) => {
    return  <div class="bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            class="round-img"
            src={avatar}
            alt=""
          />
          <h4 className="text-success">Name: {name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">
        <span className="text-info font-weight-bold">Question:</span> {text}
        </p>
         <p class="post-date">
           Posted on <Moment formate="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && <div>
        <button onClick={e=> addLike(_id)} type="button" class="btn btn-light">
          <i class="fas fa-thumbs-up"></i>{' '}
          {likes.length > 0 && (
           <span>{likes.length}</span>
          )}
        </button>
        <button onClick={e=> removeLike(_id)} type="button" class="btn btn-light">
          <i class="fas fa-thumbs-down"></i>
        </button>
        <Link to={'/post/'+_id} class="btn btn-secondary ml-3 mr-3">
        Answer
        </Link>
      {!auth.loading && user=== auth.user._id && (
        <button 
        onClick={e=>deletePost(_id)}
        type="button"
        class="btn btn-danger" >
        <i class="fas fa-times"></i>
      </button>
      )}
        </div>}
      </div>
    </div>
}

PostItem.defaultProps = {
     showActions:true
}
const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps,{addLike, deletePost, removeLike})(PostItem)
