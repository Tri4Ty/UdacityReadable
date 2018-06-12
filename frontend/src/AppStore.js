import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import MainScreenReducer from './MainScreenReducer.js';
import CategoriesReducer from './categories/CategoriesReducer.js';
import PostsReducer from './posts/PostsReducer.js';
import CommentReducer from './comments/CommentReducer.js';

function createCompose() {
  return window.devToolsExtension ?
    compose(applyMiddleware(thunk), window.devToolsExtension()) : 
    applyMiddleware(thunk);
}

export const storeCreator = (initialState) => createStore(
  combineReducers({
    mainScreenReducer: MainScreenReducer,
    categoriesReducer: CategoriesReducer,
    postsReducer: PostsReducer,
    commentReducer: CommentReducer
  }),
  initialState,
  createCompose()
);

const store = storeCreator();

export default store;