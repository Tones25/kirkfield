import React from 'react';
import AccountsUI from '../AccountsUI.jsx';

export const MainLayout = ({content}) => (
	<div className="container">
	<header>
		<h2>Kirkfield Web Portal</h2>
		<nav className="navbar navbar-default">
			<div>
				<div className="navbar-header">
				<a className="navbar-brand" href="#">Kirkfield</a>
				</div>
				<ul className="nav navbar-nav">
					<li className="dropdown">
						<a className="dropdown-toggle" data-toggle="dropdown" href="#">Inventory
						<span className="caret"></span></a>
						<ul className="dropdown-menu">
							<li><a href="/inventoryInput">InventoryInput</a></li>
							<li><a href="/inventorySearch">InventorySearch</a></li>
						</ul>
					</li>
					<li><a href="/reporting">Reporting</a></li>
					<li><AccountsUI /></li>
				</ul>
			</div>
		</nav>
	</header>
	<main>
		<div>
			{content}
		</div>
	</main>
	</div>
)