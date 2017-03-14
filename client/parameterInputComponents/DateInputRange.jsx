import React, {Component} from 'react';

export default class DateRangeInput extends Component {

	constructor(props) {
		super(props);

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
	}

	handleStartDateChange(event) {
		this.props.onStartDateChange(event.target.value);
	}

	handleEndDateChange(event) {
		this.props.onEndDateChange(event.target.value);
	}
	
	render() {
		let today = new Date();
		let lastWeek = new Date();
		lastWeek.setDate(today.getDate() - 7);
		today = today.toISOString().substring(0, 10);
		lastWeek = lastWeek.toISOString().substring(0, 10);
		return (
			<div className="form-group">
				<label className="control-label col-sm-2">
					Start Date:
				</label>
				<div className="col-sm-4">
				<input 
					type="Date" 
					className="form-control"
					id="startDate"
					ref="startDate"
					defaultValue={lastWeek}
					onChange={this.handleStartDateChange}/>
				</div>
				
				<label className="control-label col-sm-2">
					End Date:
				</label>
				<div className="col-sm-4">
					<input 
						type="Date" 
						className="form-control"
						id="endDate"
						ref="endDate"
						defaultValue={today}
						onChange={this.handleEndDateChange}/>
				</div>
			</div>

		)
	}				

}