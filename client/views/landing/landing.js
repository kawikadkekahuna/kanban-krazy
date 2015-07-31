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
		Accounts.createUser({
			username: username,
			password: password,
			email: email,
		},function(){
			console.log('user added');
		});
	},

	'click .landing-login':function(event,template){
		console.log('clicked');
		$('.landing-login-submit').click(function(event){
			event.preventDefault();
			var email = $('.landing-login-email').val();
			var password = $('.landing-login-password').val();
			Meteor.loginWithPassword(email,password,function(){
				console.log('logged in');
				Router.redirect('/dashboard');
			});

		});	
	}


});

