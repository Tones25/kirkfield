import React, { Component } from 'react';

export default class Checkbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isChecked: false,
		}

		this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
	}

	toggleCheckboxChange() {
		const { handleCheckboxChange, label } = this.props;

		this.setState(({isChecked}) => (
			{
				isChecked: !isChecked,
			}
			));

		handleCheckboxChange(label);
	}

	render() {
	    const { label } = this.props;
	    const { isChecked } = this.state;
	    console.log(label);

	    return (
	      <div className="checkbox">
	        <label>
	          <input
	                            type="checkbox"
	                            value={label}
	                            checked={isChecked}
	                            onChange={this.toggleCheckboxChange}
	                        />

	          {label}
	        </label>
	      </div>
	    )
  }
}