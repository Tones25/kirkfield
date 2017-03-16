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
					<li><a href="/customers">Customers</a></li>
					<li><AccountsUI /></li>
				</ul>
				</div>
				)
	}
}