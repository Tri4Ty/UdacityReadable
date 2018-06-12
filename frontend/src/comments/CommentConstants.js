export const commentActionTypes = {
  SHOW_COMMENT_FORM: 'SHOW_COMMENT_FORM',
  HIDE_COMMENT_FORM: 'HIDE_COMMENT_FORM',
  COMMENTS_FOUND: 'COMMENTS_FOUND',
  COMMENT_ATTR_VALUE_UPDATE: 'COMMENT_ATTR_VALUE_UPDATE',
  SHOW_EDIT_COMMENT_FORM: 'SHOW_EDIT_COMMENT_FORM'
};

export const commentAttributes = {
  USERNAME: 'USERNAME',
  COMMENT: 'COMMENT',
};

// `GET /posts/:id/comments` | Get all the comments for a single post.
export const GET_COMMENTS_URL = `${process.env.REACT_APP_BACKEND}/posts/`;

// `POST /comments/:id` | Used for voting on a comment.
export const GET_VOTE_COMMENT_URL = `${process.env.REACT_APP_BACKEND}/comments/`;

// `POST /comments` | Add a comment to a post. | **id** - Any unique ID. As with posts, UUID is probably the best here. <br> **timestamp** - [Timestamp] Get this however you want. <br> **body** - [String] <br> **owner** - [String] <br> **parentId** - Should match a post id in the database.
export const CREATE_NEW_COMMENT_URL = `${process.env.REACT_APP_BACKEND}/comments`;

// `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String]
export const UPDATE_EXISTING_COMMENT_URL = `${process.env.REACT_APP_BACKEND}/comments/`;

// `DELETE /comments/:id` | Sets a comment's deleted flag to `true`.
export const DELETE_COMMENT_URL = `${process.env.REACT_APP_BACKEND}/comments/`;