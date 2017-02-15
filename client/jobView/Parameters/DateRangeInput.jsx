import React, {Component} from 'react';

export default class DateRangeInput extends Component {
	
	render() {
		return (
			<div>
				
				Start Date:
				
				<input 
					type="Date" 
					className="form-control"
					id="DateInput"
					ref="DateInput"/>
				
				End Date:
				
				<input 
					type="Date" 
					className="form-control"
					id="DateInput"
					ref="DateInput"/>
			
			</div>

		)
	}				

}