import React from 'react';
import AccountsUI from '../AccountsUI.jsx';
import AppHeader from './AppHeader.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

Accounts.ui.config({
			passwordSignupFields: 'USERNAME_ONLY',
		});

		Accounts.config({
			forbidClientAccountCreation: true,
		
		});

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
				<ReactCSSTransitionGroup
					transitionName="appHeader"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					transitionAppear={true}
					transitionAppearTimeout={750}>
					<AppHeader />
				</ReactCSSTransitionGroup>
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
