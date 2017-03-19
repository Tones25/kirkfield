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
		//console.log(this.props.startDate);
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
					defaultValue={this.props.startDate.toISOString().substring(0, 10)}
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
						defaultValue={this.props.endDate.toISOString().substring(0, 10)}
						onChange={this.handleEndDateChange}/>
				</div>
			</div>

		)
	}				
}

DateRangeInput.defaultProps = {
	startDate: new Date(),
	endDate: new Date()
}