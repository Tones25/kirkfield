import React from 'react';
import AccountsUI from '../AccountsUI.jsx';

export const MainLayout = ({content}) => (
	<div>
	
	<div className="jumbotron">
		<h1 className="text-center">Kirkfield Web Portal</h1>
	</div>
		
	<div className="container">
	<header>
		<div className="row">
		
		<nav className="navbar navbar-default text-center">
			<div>v
				<div className="navbar-header">
				<a className="navbar-brand" href="/">Kirkfield</a>
				</div>
				<ul className="nav navbar-nav">
					<li><a href="/inventoryInput">Inventory</a></li>
					<li><a href="/jobInput">Jobs</a></li>
					<li><a href="/vehicleInput">Vehicles</a></li>
					<li><a href="/employees">Employees</a></li>
					<li><a href="/customers">Customers</a></li>
					<li><a href="/reporting">Reporting</a></li>
					<li><AccountsUI /></li>
				</ul>
			</div>
		</nav>
		</div>
	</header>
	<main>
		<div>
			{content}
		</div>
	</main>
	</div>
	
	</div>
)