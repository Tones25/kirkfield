import React, {Component} from 'react';

export default class DateInput extends Component {
	
	constructor(props) {
		super(props);

		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleDateChange(event) {
		this.props.onDateChange(event.target.value);
	}

	
	render() {
		return (
			<div>
				
				Date:
				
				<input 
					type="Date" 
					className="form-control"
					id="date"
					ref="date"
					defaultValue={new Date().toISOString().substring(0, 10)}
					onChange={this.handleDateChange}/>
				
				End Date:
				
			
			</div>

		)
	}					

}