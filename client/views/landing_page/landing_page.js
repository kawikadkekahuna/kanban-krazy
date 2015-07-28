Template.login.created = function() {

	Accounts.onLogin(function() {
		Router.go('/dashboard');

		console.log('user',Meteor.user());
	});

};

Template.login.update = function() {
	console.log('updated');
};

Template.login.destroyed = function() {
	console.log('destroyed');
};


Template.login.helpers({



});

Template.login.events({



});
