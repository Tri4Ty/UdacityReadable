import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';

import { CategoryList } from '../categories/CategoryList';
import PostSummary from './PostSummary';
import {
  showPostForm,
  hidePostForm,
  fetchAllPosts
} from './PostsActions';
import OrderByForm from './OrderByForm';
import PostForm from './PostForm';
import { sortPosts } from './PostUtils';

let mapDispatchToProps = (dispatch) => {
  return {
    onRequestAllPosts: () => {
      dispatch(fetchAllPosts());
    },
    onShowPost: () => {
      dispatch(showPostForm());
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

class PostList extends Component {

  componentDidMount() {
    this.props.onRequestAllPosts();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.postModified && this.props.postModified !== prevProps.postModified) {
      this.props.onRequestAllPosts();
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
      
		<h2>All Posts</h2>
      	{ (filteredPosts && filteredPosts.length > 0) ? (
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
export default connect(mapStateToProps, mapDispatchToProps)(PostList);