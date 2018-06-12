import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { Voter } from '../Voter';
import { 
  voteOnPost,
  showEditPostForm,
  deletePost
} from './PostsActions';
import { getComments } from '../comments/CommentActions';
import { capitalize } from '../utils';

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
    onEditPost: (postObj) => {
      dispatch(showEditPostForm(postObj));
    },
    onDeletePost: (id) => {
      dispatch(deletePost(id));
    }
  }
}

let mapStateToProps = ({commentReducer}) => {
  let {
    comments = {}
  } = commentReducer;
  
  return {
    comments
  };
}

class PostSummary extends Component {
  componentDidMount() {
    this.props.onGetComments(this.props.post.id);
  }
  
  render() {
    let { 
      comments
    } = this.props;
    
    // path the the post details page is /:category/:postId
    let postDetailsPath = `/${this.props.post.category}/${this.props.post.id}`
    
    return (
      <div className="post-summary">
      	<h3><Link to={postDetailsPath}>{this.props.post.title}</Link></h3>
		<span className='post-author-date'><strong>{this.props.post.author}</strong> ({new Date(this.props.post.timestamp).toUTCString()})</span>
      	<p>Category: {capitalize(this.props.post.category)}</p>
      	<p>Comments: {(comments[this.props.post.id]) ? comments[this.props.post.id].length : 0}</p>
      	<Button bsSize="xsmall" onClick={ () => this.props.onEditPost(this.props.post) }>Edit</Button>
      	<Button bsSize="xsmall" onClick={ () => this.props.onDeletePost(this.props.post.id) }>Delete</Button>
      	<Voter 
      		score={this.props.post.voteScore} 
      		voteUp={ () => this.props.onVoteUpPost(this.props.post.id) }
      		voteDown={ () => this.props.onVoteDownPost(this.props.post.id) } />
      </div>
    );
  }
} export default connect(mapStateToProps, mapDispatchToProps)(PostSummary);
