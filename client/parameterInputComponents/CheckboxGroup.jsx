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
		this.props.onSelectionChange(event.target.value);
	}
	
	render() {
		return (
			<div className="form-group">
				{this.state.options.map( (option) => {
					return 	<div className="checkbox col-sm-1" key={option}>
								<label>
									<input
										type="checkbox"
										onChange={this.onSelectionChange}
										value={option}/>{option}
								</label>
							</div>
				})}
			</div>
		)
	}
}