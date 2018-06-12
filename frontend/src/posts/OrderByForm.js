import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  postOrderChange
} from './PostsActions';

let mapDispatchToProps = (dispatch) => {
  return {
    onPostOrderChange: (orderBy) => {
      dispatch(postOrderChange(orderBy));
    }
  }
}

let mapStateToProps = ({postsReducer}) => {
  let {
    postOrder = 'timestamp'
  } = postsReducer;
  
  return {
    postOrder
  };
}

class OrderByForm extends Component {
  render() {
    let { postOrder } = this.props;
    //let timestampChecked = (postOrder === 'timestamp') ? 'checked' : '';
    //let titleChecked = (postOrder === 'title') ? 'checked' : '';
   //console.log('order by: ' + postOrder);

    return (
      <div>
      	<span>Order By: </span>
      	<input 
      		type='radio' 
      		name='sortOrder' 
      		id='dateSortOrder' 
      		value='timestamp' 
      		checked={postOrder === 'timestamp'}
      		onChange={ () => this.props.onPostOrderChange('timestamp') } /> Date 
      	<input 
			type='radio' 
			name='sortOrder' 
			id='titleSortOrder' 
			value='title' 
      		checked={postOrder === 'title'}
			onChange={ () => this.props.onPostOrderChange('title') } /> Title
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderByForm);