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
			<div>
				<div className="navbar-header">
				<a className="navbar-brand" href="/">Kirkfield</a>
				</div>
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
					<li><a href="/reporting">Reporting</a></li>
					<li><a href="/admin">Admin</a></li>
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