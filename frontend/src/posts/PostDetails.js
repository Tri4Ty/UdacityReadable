import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { Voter } from '../Voter';
import CommentSummary from '../comments/CommentSummary';
import { 
  voteOnPost,
  getPostDetails
} from './PostsActions';
import { 
  getComments,
  showCommentForm,
  hideCommentForm
} from '../comments/CommentActions';
import { capitalize } from '../utils';
import CommentForm from '../comments/CommentForm';

let mapDispatchToProps = (dispatch) => {
  return {
    onVoteUpPost: (id) => {
      dispatch(voteOnPost(id, "upVote"));
    },
    onVoteDownPost: (id) => {
      dispatch(voteOnPost(id, "downVote"));
    },
    onGetComments: (id) => {
      dispatch(getComments(id));
    },
    onGetPostDetails: (id) => {
      dispatch(getPostDetails(id));
    },
    onShowComment: () => {
      dispatch(showCommentForm());
    },
    onHideComment: () => {
      dispatch(hideCommentForm());
    }
  }
}

let mapStateToProps = ({postsReducer, commentReducer}) => {
  let {
    postDetails = {},
    postModified = false
  } = postsReducer;
  
  let {
    showCommentForm = false,
    comments = {}
  } = commentReducer;
  
  return {
    postDetails,
    showCommentForm,
    comments,
    postModified
  };
}

class PostDetails extends Component {
  componentDidMount() {
    let path = this.props.location.pathname;
    let ids = path.split('/');
    this.props.onGetPostDetails(ids[2]);
    this.props.onGetComments(ids[2]);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.postModified && this.props.postModified !== prevProps.postModified) {
      let path = this.props.location.pathname;
      let ids = path.split('/');
      this.props.onGetPostDetails(ids[2]);
    }
  }
  
  render() {
    let { 
      postDetails,
      showCommentForm = false,
      comments
    } = this.props;
    let categoryLink = `/${postDetails.category}`;
    let commentCount = comments[postDetails.id] ? comments[postDetails.id].length : 0;
    
    return (
      <div>
      { (postDetails && Object.keys(postDetails).length > 0 && postDetails.error === undefined) ? (
      	<div className="post-details">
       	<h1>{postDetails.title}</h1>
		<span className='post-author-date'><strong>{postDetails.author}</strong> ({new Date(postDetails.timestamp).toUTCString()})</span>
      	<p>Category: <Link to={categoryLink}>{capitalize(postDetails.category)}</Link></p>
      	<p>{postDetails.body}</p>
      	<Voter 
      		score={postDetails.voteScore} 
      		voteUp={ () => this.props.onVoteUpPost(postDetails.id) }
      		voteDown={ () => this.props.onVoteDownPost(postDetails.id) } />
		<h2>Comments ({commentCount})</h2>
		<div className='comment-list'>
			{ (comments && comments[postDetails.id] && comments[postDetails.id].length > 0) ? 
				( comments[postDetails.id].map( comment => <CommentSummary comment={comment} key={comment.id} /> )) : 
				( <p>No Comments</p> )
            }
		</div>
      	<Button onClick={this.props.onShowComment}>Write New Comment</Button>
		<CommentForm 
			show={showCommentForm}
      		parentPost={postDetails.id}
			closeCallback={this.props.onHideComment} />
                 </div>
        ) : (
          <div>
          	<h1>The post you are looking for does not exist</h1>
          	<p>Click <Link to={"/"}>here</Link> to view all posts</p>
          </div>
        ) }
      </div>
    );
  }
} export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
