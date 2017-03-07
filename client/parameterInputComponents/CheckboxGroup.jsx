import React, {Component} from 'react';

export default class CheckboxGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			options: this.props.options,
			checked: []
		}
		this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	
	onSelectionChange(event) {
		//console.log(event.target.value);
		let toggled = event.target.value;
		console.log(toggled);
		this.setState((prevState, props) => {
			let toggledIndex = prevState.checked.indexOf(toggled);
			console.log(toggledIndex);
			let newChecked = prevState.checked;
			if (toggledIndex === -1) {
				newChecked.push(toggled);
				console.log(newChecked);
			} else {
				newChecked.splice(toggledIndex, 1);		
			}
			return {checked: newChecked};
		});
		//this.props.onSelectionChange(event.target.value);
	}
	
	render() {
		console.log(this.state.checked);
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