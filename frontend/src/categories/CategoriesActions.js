import { 
  categoryActionTypes,
  GET_CATEGORIES_URL
} from './CategoriesConstants';

const creatCategoriesFoundAction = categories => ({
  type: categoryActionTypes.CATEGORIES_FOUND,
  data: categories
});

export const fetchAllCategories = () => dispatch => (
  	fetch(GET_CATEGORIES_URL, { 
    	headers: { 'Authorization': 'whatever-you-want' },
        credentials: 'include' 
  	})
    .then( (res) => res.text() )
    .then((data) => {
      dispatch(creatCategoriesFoundAction(JSON.parse(data)));
    })
);