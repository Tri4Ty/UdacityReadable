import React from 'react';
import { Button } from 'react-bootstrap';

export const Voter = props => {
	return (
      <div className='post-score'>
      	Score: {props.score}
      	<Button bsSize="xsmall" onClick={props.voteUp}>+</Button>
      	<Button bsSize="xsmall" onClick={props.voteDown}>-</Button>
      </div>
    )
}