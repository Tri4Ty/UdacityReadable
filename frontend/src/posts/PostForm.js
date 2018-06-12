import React, { Component } from 'react';
import {connect} from 'react-redux';
import { 
  Button,
  Modal 
} from 'react-bootstrap';

import { 
  createNewPost,
  editExistingPost,
  updatePostAttrValue
} from './PostsActions';
import { postsAttributes } from './PostsConstants';

const uuidv1 = require('uuid/v1');

let mapDispatchToProps = (dispatch) => {
  return {
    onCreatePost: (newPost) => {
      dispatch(createNewPost(newPost));
    },
    onEditPost: (updatedPost) => {
      dispatch(editExistingPost(updatedPost));
    },
    onUpdateAttribute: (value, attr) => {
      dispatch(updatePostAttrValue(value, attr));
    },
  }
}

let mapStateToProps = ({postsReducer}) => {
  let {
    currentPostId = undefined,
    username = '',
    title = '',
    selectedCategory = {},
    message = ''
  } = postsReducer;
  
  return {
    currentPostId,
    username,
    title,
    selectedCategory,
    message
  };
}

class PostForm extends Component {
  createPostObj() {
  	let postObj = {
		id: uuidv1(),
    	timestamp: Date.now(),
    	title: this.props.title,
    	author: this.props.username,
    	category: this.props.selectedCategory,
    	body: this.props.message
    };
    return postObj;
  }
  
  createUpdatedPostObj() {
    let postObj = {
		id: this.props.currentPostId,
    	title: this.props.title,
    	body: this.props.message
    };
    return postObj;
  }

  render() {
    let { 
      currentPostId,
      categories,
   	  username,
      title,
      selectedCategory,
      message,
      onUpdateAttribute,
      onCreatePost,
      onEditPost
    } = this.props;

    let categoryList = categories.map( category => {
      if (category.path === selectedCategory) {
        return <option key={category.path} value={category.path} selected>{category.name}</option>
      } else {
        return <option key={category.path} value={category.path}>{category.name}</option>
      }
    });
                                                 
    return (
      <Modal show={this.props.show} onHide={this.props.closeCallback}>
      	<Modal.Header closeButton>
      		<Modal.Title>{(currentPostId) ? 'Edit' : 'Create'} Post</Modal.Title>
      	</Modal.Header>
      	<Modal.Body>
      		<form>
      			Post Title: <input 
					type="text" 
					name="title" 
      				ref={(title) => this.title = title}
					value={title} 
					onChange={ () => onUpdateAttribute(this.title.value, postsAttributes.TITLE) } /> <br />
      			Username: <input 
      				type="text" 
      				name="username" 
      				ref={(username) => this.username = username}
      				value={username} 
					disabled={(currentPostId) ? true : false}
      				onChange={ () => onUpdateAttribute(this.username.value, postsAttributes.USERNAME) } /> <br />
      			Category: <select 
					name="category"
					disabled={(currentPostId) ? true : false}
					ref={(category) => this.category = category}
					onChange={ () => onUpdateAttribute(this.category.value, postsAttributes.CATEGORY) }>{categoryList}</select> <br />
      			Post Message: <textarea 
					name="message" 
					ref={(message) => this.message = message}
					rows="5" cols="30" 
					value={message} 
					onChange={ () => onUpdateAttribute(this.message.value, postsAttributes.MESSAGE) } /> <br />
      			<Button onClick={ () => {
                	(currentPostId) ? onEditPost(this.createUpdatedPostObj()) : onCreatePost(this.createPostObj()) 
                }}>{(currentPostId) ? 'Edit' : 'Create'}</Button>
      		</form>
      	</Modal.Body>
      	<Modal.Footer>
      		<Button onClick={this.props.closeCallback}>Close</Button>
      	</Modal.Footer>
      </Modal>
    );
  }
} export default  connect(mapStateToProps, mapDispatchToProps)(PostForm);