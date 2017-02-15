import React, {Component} from 'react';

export default class DateInput extends Component {
	
	render() {
		return (
			<input 
			type="Date" 
			className="form-control"
			id="DateInput"
			ref="DateInput"/>
		)
	}				

}