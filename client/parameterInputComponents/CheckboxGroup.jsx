import React, {Component} from 'react';

export default class CheckboxGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			options: this.props.options,
		}
		this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	
	onSelectionChange(event) {
		this.props.onSelectionChange(event);
	}
	
	render() {
		return (
			<div className="form-group">
				{this.state.options.map( (option) => {
					return 	<div key={option._id}>
								<input
								type="checkbox"
								onChange={this.onSelectionChange}
								value={option._id}/>{option._id}
							</div>
				})}
			</div>
		)
	}
}