import { 
  postsActionTypes,
  postsAttributes
} from './PostsConstants';

export default (state = {comments: {}}, action) => {
  switch (action.type) {
    case postsActionTypes.SHOW_POST_FORM:
      return {        
        ...state,
        showPostsForm: true,
        currentPostId: action.data
      };
    case postsActionTypes.HIDE_POST_FORM:
      // when closing the form, ensure all fields are cleared
      return {        
        ...state,
        showPostsForm: false,
        currentPostId: undefined,
        username: '',
        title: '',
        selectedCategory: '',
        message: ''
      };
    case postsActionTypes.SHOW_EDIT_POST_FORM:
      let oldPostObj = action.data;
      return {        
        ...state,
        showPostsForm: true,
        currentPostId: oldPostObj.id,
        username: oldPostObj.author,
        title: oldPostObj.title,
        selectedCategory: oldPostObj.category,
        message: oldPostObj.body
      };
    case postsActionTypes.POST_MODIFIED:
      return {
        ...state,
        postModified: true
      };
    case postsActionTypes.POST_ORDER_CHANGE:
      return {
        ...state,
        postOrder: action.data
      };
    case postsActionTypes.POSTS_FOUND:
      return {        
        ...state,
        postList: action.data,
        postModified: false
      };
    case postsActionTypes.POST_DETAILS_FOUND:
      return {        
        ...state,
        postDetails: action.data,
        postModified: false
      };
    case postsActionTypes.POST_ATTR_VALUE_UPDATE:
      if (action.data.attr === postsAttributes.USERNAME) {
        return {        
          ...state,
          username: action.data.value
        };
      } else if (action.data.attr === postsAttributes.TITLE) {
        return {        
          ...state,
          title: action.data.value
        };
      } else if (action.data.attr === postsAttributes.CATEGORY) {
        return {        
          ...state,
          selectedCategory: action.data.value
        };
      } else if (action.data.attr === postsAttributes.MESSAGE) {
        return {        
          ...state,
          message: action.data.value
        };
      }
      break;
    default:
      return state;
  }
};
