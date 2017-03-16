import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class AccountsUI extends Component {

	componentDidMount() {
		this.view = Blaze.render(Template.loginButtons,
			ReactDOM.findDOMNode(this.refs.container));
		Accounts.ui.config({
			passwordSignupFields: 'USERNAME_ONLY',
		});

		Accounts.config({
			forbidClientAccountCreation: true,
		
		});
	}

	componentWillUnmount() {
		Blaze.remove(this.view);
	}

	render() {
		return <span ref="container" />
	}
}