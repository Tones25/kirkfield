import React, {Component} from 'react';
import AccountsUI from '../AccountsUI.jsx';


export default class AdminNav extends Component {

	

	render() {


		return (
				<div>
				<ul className="nav navbar-nav">
					<li><a href="/inventoryInput">Inventory</a></li>
					<li><a href="/jobInput">Jobs</a></li>
					<li><a href="/vehicleInput">Vehicles</a></li>
					<li><a href="/employees">Employees</a></li>
					<li><a href="/customers">Customers</a></li>
					<li><a href="/reporting">Reporting</a></li>
					<li><a href="/admin">Admin</a></li>

					
					<li><AccountsUI /></li>
				</ul>
				</div>
				)
	}
}