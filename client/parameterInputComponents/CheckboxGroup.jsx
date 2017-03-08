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
				<label className="row">{this.props.label ? this.props.label : ""}</label>
				{this.state.options.map( (option) => {
					return 	<div className="checkbox row"
								 key={this.props.keyProperty ? option[this.props.keyProperty] : option}>
								<label>
									<input
										type="checkbox"
										onChange={this.onSelectionChange}
										value={this.props.keyProperty ? option[this.props.keyProperty] : option}/>{this.props.labelProperty ? option[this.props.labelProperty] : option}
								</label>
							</div>
				})}
			</div>
		)
	}
}