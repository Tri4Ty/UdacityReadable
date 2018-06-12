import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';

import { CategoryList } from '../categories/CategoryList';
import PostSummary from './PostSummary';
import {
  showPostForm,
  hidePostForm,
  fetchAllCategoryPosts
} from './PostsActions';
import OrderByForm from './OrderByForm';
import PostForm from './PostForm';
import { sortPosts } from './PostUtils';

let mapDispatchToProps = (dispatch) => {
  return {
    onRequestAllCategoryPosts: (category) => {
      dispatch(fetchAllCategoryPosts(category));
    },
    onShowPost: (post) => {
      dispatch(showPostForm(post));
    },
    onHidePost: () => {
      dispatch(hidePostForm());
    }
  }
}

let mapStateToProps = ({categoriesReducer, postsReducer}) => {
  let {
    categories = []
  } = categoriesReducer;
  
  let {
    postList = [],
    showPostsForm = false,
    postOrder = 'timestamp',
    postModified = false
  } = postsReducer;
  
  return {
    categories,
    postList,
    showPostsForm,
    postOrder,
    postModified
  };
}

class PostListByCategory extends Component {

  componentDidMount() {
    this.props.onRequestAllCategoryPosts(this.props.path);
  }
  
  componentDidUpdate(prevProps) {
    if ((this.props.path !== prevProps.path) ||
        (this.props.postModified && this.props.postModified !== prevProps.postModified)){
    	this.props.onRequestAllCategoryPosts(this.props.path);
    }
  }

  render() {
    let { 
      categories,
      postList,
      showPostsForm,
      postOrder
    } = this.props;

    let filteredPosts = postList.filter( post => post.deleted !== true );
	let sortedPosts = sortPosts(filteredPosts, postOrder);
    
    return (
      <div>
      	<h2>Categories</h2>
		<CategoryList categories={categories} />
      
		<h2>{this.props.path.charAt(0).toUpperCase() + this.props.path.substr(1)} Posts</h2>
      	{ (postList && postList.length > 0) ? (
           <div>
      		<OrderByForm />
      		<div className='post-list'>{ sortedPosts.map( post => <PostSummary post={post} key={post.id} /> ) }</div>
		  </div>
      	) : (
      	  <p>No Posts Written</p>
      	)}
      	<Button onClick={this.props.onShowPost}>Write New Post</Button>
		<PostForm 
			show={showPostsForm}
      		categories={categories}
			closeCallback={this.props.onHidePost} />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostListByCategory);