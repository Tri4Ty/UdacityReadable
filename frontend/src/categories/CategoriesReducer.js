import { categoryActionTypes } from './CategoriesConstants';

export default (state = {}, action) => {
  switch (action.type) {
    case categoryActionTypes.CATEGORIES_FOUND:
      return {        
        ...state,
        categories: action.data.categories
      };
    default:
      return state;
  }
};

