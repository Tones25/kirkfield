import React, {Component} from 'react';
import AccountsUI from '../AccountsUI.jsx';


export default class AdminNav extends Component {

	

	render() {


		return (
				<div>
				<ul className="nav navbar-nav">
					<li className="dropdown">
						<a className="dropdown-toggle" data-toggle="dropdown" href="#">Inventory
						<span className="caret"></span></a>
						<ul className="dropdown-menu">
							<li><a href="/inventoryInput">Inventory Input</a></li>
							<li><a href="/inventorySearch">Inventory Search</a></li>
						</ul>
					</li>
					<li className="dropdown">
						<a className="dropdown-toggle" data-toggle="dropdown" href="#">Jobs
						<span className="caret"></span></a>
						<ul className="dropdown-menu">
							<li><a href="/jobInput">Job Input</a></li>
						</ul>
					</li>
					<li className="dropdown">
						<a className="dropdown-toggle" data-toggle="dropdown" href="#">Vehicles
						<span className="caret"></span></a>
						<ul className="dropdown-menu">
							<li><a href="/vehicles">Vehicles</a></li>
							<li><a href="/vehicleInput">Vehicle Input</a></li>
						</ul>
					</li>
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