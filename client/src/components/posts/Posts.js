import React,{Fragment, useEffect} from 'react'
import {connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import {getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({getPosts, post:{posts, loading}}) => {
    
    useEffect(()=>{
        getPosts()
    }, [getPosts]);

    return loading ? <Spinner /> : (
        <Fragment>
            <PostForm />

            <div className="container">
                    
            <h1 className="large text-warning border-bottom">Posts</h1>
              {posts.map(post=>(
                   <div className="row border border-dark">
                       <div className="">
                  <PostItem key={post._id} post={post} />
                  </div>
                  </div>
              ))}
              
              
            </div>
        </Fragment>
    )
}

Posts.propTypes = {

}

const mapStateToProps= state =>({
    post:state.post
})

export default connect(mapStateToProps, {getPosts})(Posts)
