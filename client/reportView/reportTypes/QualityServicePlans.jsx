import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import BarChart from '../chartTypes/BarChart.jsx';
import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import {Customers} from './../../customerView/CustomerInputWrapper.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';
import PieChart from '../chartTypes/PieChart.jsx';
import SearchBox from '../../parameterInputComponents/SearchBox.jsx';
import DataTable from './../../DataTable.jsx';
export default class QualityServicePlans extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		
		let today = new Date();
		let lastWeek = new Date();
		lastWeek.setDate(today.getDate() - 7);
		
		this.state = {
			startDate: lastWeek,
			endDate: today,
			subscription: {
				customers: Meteor.subscribe("allCustomers")
			}
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
	}
	
	handleStartDateChange(startDate) {
		let dateTokens = startDate.split("-");
		let dateYear = parseInt(dateTokens[0]);
		let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
		let dateDay = parseInt(dateTokens[2]);
		let parsedDate = new Date(dateYear, dateMonth, dateDay);
		this.setState({
			startDate: parsedDate,
		});
	}

	handleEndDateChange(endDate) {
		let dateTokens = endDate.split("-");
		let dateYear = parseInt(dateTokens[0]);
		let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
		let dateDay = parseInt(dateTokens[2]);
		let parsedDate = new Date(dateYear, dateMonth, dateDay);
		this.setState({
			endDate: parsedDate,
		});
	}
	
	customersWithQsp() {
		return Customers.find({"qsp": true});
	}
	
	customersWithoutQsp() {
		return Customers.find({"qsp": false});
	}
	
	render() {
		const chartHeight = 480;
		console.log(Customers.find().count());
		return (
			<div>
				<div className="well well-sm">
					<h2>Quality Service Plan Summary</h2>
				
				
				<h3>{this.customersWithQsp().count()} Customers with Quality Service Plan</h3>
				<DataTable
					rowHeight={50}
					columns={['customerId', 'contactName', 'address', 'phone1', 'nextService']}
					columnNames={['Customer Id', 'Customer', 'Address', 'Phone Number', 'Next Service']}
					deleteButtons={false}
					editButtons={false}
					numberOfRows={6}
					data={this.customersWithQsp().fetch().map(function(customer) {
						customer.nextService = customer.nextService.toDateString();
						return customer;
					})} 
					/>
				
				<h3>{this.customersWithoutQsp().count()} Customers without Quality Service Plan</h3>
				<DataTable
					rowHeight={50}
					columns={['customerId', 'contactName', 'address', 'phone1', 'nextService']}
					columnNames={['Customer Id', 'Customer', 'Address', 'Phone Number', 'Next Service']}
					deleteButtons={false}
					editButtons={false}
					numberOfRows={6}
					data={this.customersWithoutQsp().fetch().map(function(customer) {
						customer.nextService = customer.nextService.toDateString();
						return customer;
					})} 
					/>
				</div>
			</div>
			)
	}
} 