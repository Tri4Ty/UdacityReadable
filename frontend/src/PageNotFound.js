import React from 'react';
import { Link } from 'react-router-dom';


export const PageNotFound = () => {
	return (
      <div className='page-not-found'>
      	<h1>The page you are looking for does not exist</h1>
      	<p>Click <Link to={"/"}>here</Link> to view all posts</p>
      </div>
    )
}