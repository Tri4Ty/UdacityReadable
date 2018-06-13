import { 
  GET_COMMENTS_URL,
  GET_VOTE_COMMENT_URL,
  CREATE_NEW_COMMENT_URL,
  UPDATE_EXISTING_COMMENT_URL,
  DELETE_COMMENT_URL,
  commentActionTypes
} from './CommentConstants';

export const showCommentForm = commentId => ({
  type: commentActionTypes.SHOW_COMMENT_FORM,
  data: commentId
});

export const hideCommentForm = () => ({
  type: commentActionTypes.HIDE_COMMENT_FORM
});

export const showEditCommentForm = comment => ({
  type: commentActionTypes.SHOW_EDIT_COMMENT_FORM,
  data: comment
});

const postCommentsEvent = (id, comments) => ({
	type: commentActionTypes.COMMENTS_FOUND,
  	data: {
      id: id,
      comments: comments
    }
});

export const getComments = (id) => dispatch => (
	fetch(GET_COMMENTS_URL + id + '/comments', { 
    	headers: { 'Authorization': 'whatever-you-want' }
    })
    .then( (res) => res.text() )
    .then((data) => {
      dispatch(postCommentsEvent(id, JSON.parse(data)));
    })
);

export const voteOnComment = (comment, vote) => {
  return dispatch => (  
  fetch(GET_VOTE_COMMENT_URL + comment.id, {
        method: 'POST',
    	headers: { 
          'Authorization': 'whatever-you-want',
          'content-type': 'application/json'
        },
        body: JSON.stringify({ option: vote })
	})
	.then( () => {
      dispatch(getComments(comment.parentId));
    })
  	.catch( error => console.log.error('Error:', error))
);}

export const updateCommentAttrValue = (value, attr) => ({
	type: commentActionTypes.COMMENT_ATTR_VALUE_UPDATE,
    data: {
    	attr: attr,
      	value: value
    }
});

export const createNewComment = newComment => dispatch => (  
  fetch(CREATE_NEW_COMMENT_URL, {
        method: 'POST',
    	headers: { 
          'Authorization': 'whatever-you-want',
          'content-type': 'application/json'
        },
        body: JSON.stringify(newComment)
	})
	.then( () => {
      dispatch(getComments(newComment.parentId));
      dispatch(hideCommentForm());
    })
  	.catch( error => console.log.error('Error:', error))
);

export const editExistingComment = updatedComment => dispatch => (  
  fetch(UPDATE_EXISTING_COMMENT_URL + updatedComment.id, {
        method: 'PUT',
    	headers: { 
          'Authorization': 'whatever-you-want',
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedComment)
	})
	.then( () => {
      dispatch(getComments(updatedComment.parentId));
      dispatch(hideCommentForm());
    })
  	.catch( error => console.log.error('Error:', error))
);

export const deleteComment = comment => dispatch => (  
  fetch(DELETE_COMMENT_URL + comment.id, {
        method: 'DELETE',
    	headers: { 'Authorization': 'whatever-you-want' }
	})
	.then( () => {
      dispatch(getComments(comment.parentId));
    })
  	.catch( error => console.log.error('Error:', error))
);
