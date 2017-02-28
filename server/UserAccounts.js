Meteor.users.allow({
	update(usr, doc) {
		return !!usr;
	}
})
//creates root account on initial system run 
if(Meteor.users.find().count() === 0) {
	 let id = Accounts.createUser({
		password: 'admin',
		username: 'password'
	});
	Roles.setUserRoles(id, ['admin']);
}

//adds fields to the employee  table - to be figured out 
Accounts.onCreateUser(function(options, user) {
	user.roles = ['usr'];
	
	return user;
});


Meteor.methods({
	createAdm(username, password) {
		check(username, String);
		check(password, String);
		
		if(Meteor.users.findOne({username: username})) {
			console.log('Username already exists...');
			return 'User already exists';
        } 

        else {
			
			let id = Accounts.createUser({
				username: username,
				password: password,
			});
			Roles.setUserRoles(id, ['adm']);
		}

	},
	
	createEmp(username, password) {
		check(username, String);
		check(password, String);
		if (Meteor.users.findOne({username: username})) {
			console.log('Username already exists...');
			return 'User already exists';
		} else {

			let id = Accounts.createUser({
				username: username,
				password: password
			});
		}
	},
	removeUser(user){
		check(user, Object);
		Meteor.users.remove(user);
	}
});
