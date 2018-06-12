import { REACT_APP_BACKEND } from '../AppConstants';

export const postsActionTypes = {
  SHOW_POST_FORM: 'SHOW_POST_FORM',
  HIDE_POST_FORM: 'HIDE_POST_FORM',
  POST_ATTR_VALUE_UPDATE: 'POST_ATTR_VALUE_UPDATE',
  POSTS_FOUND: 'POSTS_FOUND',
  COMMENTS_FOUND: 'COMMENTS_FOUND',
  POST_ORDER_CHANGE: 'POST_ORDER_CHANGE',
  POST_DETAILS_FOUND: 'POST_DETAILS_FOUND',
  SHOW_EDIT_POST_FORM: 'SHOW_EDIT_POST_FORM',
  POST_MODIFIED: 'POST_MODIFIED'
};

export const postsAttributes = {
  USERNAME: 'USERNAME',
  TITLE: 'TITLE',
  CATEGORY: 'CATEGORY',
  MESSAGE: 'MESSAGE',
};

// `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **owner** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire.
export const CREATE_NEW_POST_URL = `${process.env.REACT_APP_BACKEND}/posts`;

// `GET /posts` | Get all of the posts. Useful for the main page when no category is selected.
export const GET_ALL_POSTS_URL = `${process.env.REACT_APP_BACKEND}/posts`;

// `GET /:category/posts` | Get all of the posts for a particular category.
export const GET_ALL_CATEGORY_POSTS_URL = `${process.env.REACT_APP_BACKEND}/`;

// `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`
export const GET_VOTE_POSTS_URL = `${process.env.REACT_APP_BACKEND}/posts/`; 

// `GET /posts/:id` | Get the details of a single post.
export const GET_SINGLE_POSTS_URL = `${process.env.REACT_APP_BACKEND}/posts/`; 

// `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String]
export const UPDATE_EXISTING_POST_URL = `${process.env.REACT_APP_BACKEND}/posts/`; 

// `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'.
export const DELETE_POST_URL = `${process.env.REACT_APP_BACKEND}/posts/`; 
