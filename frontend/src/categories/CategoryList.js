import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../utils';

export const CategoryList = ({ categories }) => {
	return (
      <ul>
      	{categories.map( category => <li key={category.path}><Link to={"/" + category.path}>{capitalize(category.name)}</Link></li> )} 
		<li key='home'><Link to={"/"}>All Categories</Link></li>
	  </ul>
	)
}