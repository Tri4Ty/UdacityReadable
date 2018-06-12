import { 
  CREATE_NEW_POST_URL,
  GET_ALL_POSTS_URL,
  GET_ALL_CATEGORY_POSTS_URL,
  GET_VOTE_POSTS_URL,
  GET_SINGLE_POSTS_URL,
  UPDATE_EXISTING_POST_URL,
  DELETE_POST_URL,
  postsActionTypes 
} from './PostsConstants';

export const showPostForm = () => ({
  type: postsActionTypes.SHOW_POST_FORM
});

export const hidePostForm = () => ({
  type: postsActionTypes.HIDE_POST_FORM
});

export const showEditPostForm = post => ({
  type: postsActionTypes.SHOW_EDIT_POST_FORM,
  data: post
});

export const updatePostAttrValue = (value, attr) => ({
	type: postsActionTypes.POST_ATTR_VALUE_UPDATE,
    data: {
    	attr: attr,
      	value: value
    }
});

export const postOrderChange = (orderBy) => ({
  type: postsActionTypes.POST_ORDER_CHANGE,
  data: orderBy
});

const postsFoundEvent = (posts) => ({
	type: postsActionTypes.POSTS_FOUND,
  	data: posts
});

export const fetchAllPosts = () => dispatch => (
	fetch(GET_ALL_POSTS_URL, { 
    	headers: { 'Authorization': 'whatever-you-want' },
        credentials: 'include' 
    })
    .then( (res) => res.text() )
    .then((data) => {
      dispatch(postsFoundEvent(JSON.parse(data)));
    })
);

export const fetchAllCategoryPosts = (category) => dispatch => (
  fetch(GET_ALL_CATEGORY_POSTS_URL + category + '/posts', { 
    	headers: { 'Authorization': 'whatever-you-want' },
        credentials: 'include' 
    })
    .then( (res) => res.text() )
    .then((data) => {
      dispatch(postsFoundEvent(JSON.parse(data)));
    })
);

const postDetailsFoundEvent = (postDetails) => ({
	type: postsActionTypes.POST_DETAILS_FOUND,
  	data: postDetails
});

export const getPostDetails = (id) => dispatch => (
  fetch(GET_SINGLE_POSTS_URL + id, { 
    	headers: { 'Authorization': 'whatever-you-want' },
        credentials: 'include' 
    })
    .then( (res) => res.text() )
    .then((data) => {
      dispatch(postDetailsFoundEvent(JSON.parse(data)));
    })
);

const postModifiedEvent = () => ({
	type: postsActionTypes.POST_MODIFIED
});

export const createNewPost = newPost => dispatch => (  
  fetch(CREATE_NEW_POST_URL, {
        method: 'POST',
    	headers: { 
          'Authorization': 'whatever-you-want',
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newPost)
	})
	.then( () => {
      dispatch(postModifiedEvent());
      dispatch(hidePostForm());
    })
  	.catch( error => console.log.error('Error:', error))
);

export const editExistingPost = updatedPost => dispatch => (  
  fetch(UPDATE_EXISTING_POST_URL + updatedPost.id, {
        method: 'PUT',
    	headers: { 
          'Authorization': 'whatever-you-want',
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updatedPost)
	})
	.then( () => {
      dispatch(postModifiedEvent());
      dispatch(hidePostForm());
    })
  	.catch( error => console.log.error('Error:', error))
);

export const deletePost = postId => dispatch => (  
  fetch(DELETE_POST_URL + postId, {
        method: 'DELETE',
    	headers: { 'Authorization': 'whatever-you-want' },
        credentials: 'include'
	})
	.then( () => {
      dispatch(postModifiedEvent());
    })
  	.catch( error => console.log.error('Error:', error))
);

export const voteOnPost = (id, vote) => {
  return dispatch => (  
  fetch(GET_VOTE_POSTS_URL + id, {
        method: 'POST',
    	headers: { 
          'Authorization': 'whatever-you-want',
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ option: vote })
	})
	.then( () => {
      dispatch(postModifiedEvent());
    })
  	.catch( error => console.log.error('Error:', error))
);}