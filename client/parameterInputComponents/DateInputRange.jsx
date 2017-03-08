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
		return (
			<div className="form-group">
				<label
					className="control-label col-sm-3"
					htmlFor="startDate">
					Start Date:
				</label>
				<div className="col-sm-3">
				<input 
					type="Date" 
					className="form-control"
					id="startDate"
					ref="startDate"
					defaultValue={new Date().toISOString().substring(0,10)}
					onChange={this.handleStartDateChange}
				/>
				</div>
				<label 
					className="control-label col-sm-3"
					htmlFor="endDate">
					End Date:
				</label>
				<div className="col-sm-3">
				<input 
					type="Date" 
					className="form-control"
					id="endDate"
					ref="endDate"
					defaultValue={new Date().toISOString().substring(0,10)}
					onChange={this.handleEndDateChange}
				/>
				</div>
			</div>

		)
	}				

}