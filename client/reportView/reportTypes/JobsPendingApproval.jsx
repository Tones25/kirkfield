import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';

import SearchBox from '../../parameterInputComponents/SearchBox.jsx';
import PositiveNegativeBarChart from '../chartTypes/positiveNegativeBarChart/PositiveNegativeBarChart.jsx';
import DataTableForApproval from '../../DataTableForApproval.jsx';





export default class JobPendingApproval extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		
		
		
		
	}

	
	
	jobItems() {
		
		
		
		return Jobs.find({
			"complete": false,
			}, 
			{sort: {date: 1}})
		.fetch();
	}



	render() {
		let tableRowHeight = 50;
		return (
			<div className="well well-sm">
				<h1>Jobs Pending Approval</h1>
				<DataTableForApproval 
							rowHeight={tableRowHeight}
							columns={['invoice', 'cName', 'cAddr', 'installCost', 'empName']}
							columnNames={['Invoice#', 'Customer', 'Address', 'Charge ($)', 'Employee']}
							deleteButtons={true}
							deleteFunction={'deleteJobItem'}
							verifyButtons={true}
							verifyFunction={ function(route) {FlowRouter.go("/jobApproval/" + route._id);} }
							data={this.jobItems()}
						/>
			</div>
			)
	}
} 