import { 
  commentActionTypes,
  commentAttributes
} from './CommentConstants';

export default (state = {comments: {}}, action) => {
  switch (action.type) {
    case commentActionTypes.SHOW_COMMENT_FORM:
      return {        
        ...state,
        showCommentForm: true,
        currentCommentId: action.data
      };
    case commentActionTypes.HIDE_COMMENT_FORM:
      return {        
        ...state,
        showCommentForm: false,
        currentCommentId: undefined,
        username: '',
        comment: ''
      };
    case commentActionTypes.SHOW_EDIT_COMMENT_FORM:
      let oldCommentObj = action.data;
      return {        
        ...state,
        showCommentForm: true,
        currentCommentId: oldCommentObj.id,
        comment: oldCommentObj.body,
        username: oldCommentObj.author
      };
    case commentActionTypes.COMMENTS_FOUND:
      let allComments = Object.assign({}, state.comments);
      allComments[action.data.id] = action.data.comments;
       return {
        ...state,
        comments: allComments
      }
    case commentActionTypes.COMMENT_ATTR_VALUE_UPDATE:
      if (action.data.attr === commentAttributes.USERNAME) {
        return {        
          ...state,
          username: action.data.value
        };
      } else if (action.data.attr === commentAttributes.COMMENT) {
        return {        
          ...state,
          comment: action.data.value
        };
      }
      break;
    default:
      return state;
  }
};
