Template.landing.created = function(){
	console.log('landing template');

};

Template.landing.update = function(){
	console.log('updated');
};

Template.landing.destroyed = function(){
	Router.go('/dashboard');
};


Template.landing.helpers({

});

Template.landing.events({

	'click .landing-button': function(event,template){
		event.preventDefault();
		console.log('button clicked')
		var email = $('.landing-email').val();
		var username = $('.landing-username').val();
		var password = $('.landing-password').val();
		console.log('email',email);
		console.log('username',username);
		console.log('password',password);
		Accounts.createUser({
			username: username,
			password: password,
			email: email,
		},function(){
			console.log('user added');
		});
	}

});

