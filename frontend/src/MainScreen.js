import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import { fetchAllCategories } from './categories/CategoriesActions';
import PostList from './posts/PostList';
import PostListByCategory from './posts/PostListByCategory';
import PostDetails from './posts/PostDetails';
import { PageNotFound } from './PageNotFound';

let mapDispatchToProps = (dispatch) => {
  return {
    onRequestCategories: () => {
      dispatch(fetchAllCategories());
    }
  }
}

class MainScreen extends Component {

  componentDidMount() {
    this.props.onRequestCategories();
  }

  render() {
    return (
      <div className="App">
      	<Switch>
      		<Route path="/" exact render={() => ( <PostList /> )} />
      		<Route path="/:category" exact render={({ history: { location } }) => ( <PostListByCategory path={location.pathname.substr(1)} /> )} />
      		<Route path="/:category/:id" exact render={({ history: { location } }) => ( <PostDetails /> )} />
        	<Route component={PageNotFound} />  
		</Switch>                                                                  
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(MainScreen));
