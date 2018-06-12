import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';

import { Voter } from '../Voter';
import { 
  voteOnComment,
  showEditCommentForm,
  deleteComment
} from './CommentActions';

let mapDispatchToProps = (dispatch) => {
  return {
    onVoteUpComment: (comment) => {
      dispatch(voteOnComment(comment, "upVote"));
    },
    onVoteDownComment: (comment) => {
      dispatch(voteOnComment(comment, "downVote"));
    },
    onEditComment: (commentObj) => {
      dispatch(showEditCommentForm(commentObj));
    },
    onDeleteComment: (comment) => {
      dispatch(deleteComment(comment));
    }
  }
}

class CommentSummary extends Component {
  render() {   
    return (
      <div className="comment-summary">
		<span className='comment-author-date'><strong>{this.props.comment.author}</strong> ({new Date(this.props.comment.timestamp).toUTCString()})</span>
      	<p>{this.props.comment.body}</p>
      	<Button bsSize="xsmall" onClick={ () => this.props.onEditComment(this.props.comment) }>Edit</Button>
      	<Button bsSize="xsmall" onClick={ () => this.props.onDeleteComment(this.props.comment) }>Delete</Button>
      	<Voter 
      		score={this.props.comment.voteScore} 
      		voteUp={ () => this.props.onVoteUpComment(this.props.comment) }
      		voteDown={ () => this.props.onVoteDownComment(this.props.comment) } />
      </div>
    );
  }
} export default connect(null, mapDispatchToProps)(CommentSummary);
