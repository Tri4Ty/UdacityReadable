import React, { Component } from 'react';
import {connect} from 'react-redux';
import { 
  Button,
  Modal 
} from 'react-bootstrap';

import { 
  createNewComment,
  editExistingComment,
  updateCommentAttrValue
} from './CommentActions';
import { commentAttributes } from './CommentConstants';

const uuidv1 = require('uuid/v1');

let mapDispatchToProps = (dispatch) => {
  return {
    onCreateComment: (newComment) => {
  	  console.log(JSON.stringify(newComment));
      dispatch(createNewComment(newComment));
    },
    onEditComment: (updatedComment) => {
      dispatch(editExistingComment(updatedComment));
    },
    onUpdateAttribute: (value, attr) => {
      dispatch(updateCommentAttrValue(value, attr));
    },
  }
}

let mapStateToProps = ({commentReducer}) => {
  let {
    currentCommentId = undefined,
    username = '',
    comment = ''
  } = commentReducer;
  
  return {
    currentCommentId,
    username,
    comment
  };
}

class CommentForm extends Component {
  createCommentObj() {
  	let commentObj = {
		id: uuidv1(),
    	timestamp: Date.now(),
      	parentId: this.props.parentPost,
    	author: this.props.username,
    	body: this.props.comment
    };
    return commentObj;
  }
  
  createUpdatedCommentObj() {
    let commentObj = {
		id: this.props.currentCommentId,
    	timestamp: Date.now(),
      	parentId: this.props.parentPost,
    	body: this.props.comment
    };
    return commentObj;
  }
  
  render() {
    let { 
      currentCommentId,
      username,
      comment,
      onUpdateAttribute,
      onCreateComment,
      onEditComment
    } = this.props;
    
    return (
      <Modal show={this.props.show} onHide={this.props.closeCallback}>
      	<Modal.Header closeButton>
      		<Modal.Title>{(currentCommentId) ? 'Edit' : 'Create'} Comment</Modal.Title>
      	</Modal.Header>
      	<Modal.Body>
      		<form>
      			Username: <input 
      				type="text" 
      				name="username" 
      				ref={(username) => this.username = username}
      				value={username} 
					disabled={(currentCommentId) ? true : false}
      				onChange={ () => onUpdateAttribute(this.username.value, commentAttributes.USERNAME) } /> <br />
     			Comment: <textarea 
					name="comment" 
					ref={(comment) => this.comment = comment}
					rows="5" cols="30" 
					value={comment} 
					onChange={ () => onUpdateAttribute(this.comment.value, commentAttributes.COMMENT) } /> <br />
      			<Button onClick={ () => {
                	(currentCommentId) ? onEditComment(this.createUpdatedCommentObj()) : onCreateComment(this.createCommentObj()) 
                }}>{(currentCommentId) ? 'Edit' : 'Create'}</Button>
      		</form>
      	</Modal.Body>
      	<Modal.Footer>
      		<Button onClick={this.props.closeCallback}>Close</Button>
      	</Modal.Footer>
      </Modal>
    );
  }
} export default  connect(mapStateToProps, mapDispatchToProps)(CommentForm);