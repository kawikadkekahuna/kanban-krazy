Template.landing.created = function(){

};

Template.landing.update = function(){
};

Template.landing.destroyed = function(){
};


Template.landing.helpers({

});

Template.landing.events({

	'click .landing-button': function(event,template){
		event.preventDefault();
		var email = $('.landing-email').val();
		var username = $('.landing-username').val();
		var password = $('.landing-password').val();
		Accounts.createUser({
			username: username,
			password: password,
			email: email,
		});
		Router.go('/dashboard');
	},

	'click .landing-login':function(event,template){
		$('.landing-login-submit').click(function(event){
			event.preventDefault();
			var email = $('.landing-login-email').val();
			var password = $('.landing-login-password').val();
			Meteor.loginWithPassword(email,password);

			Accounts.onLogin(function(){
				Router.go('/dashboard');
				$('.close-landing-login').click();
				$('.landing-login-submit').unbind('click');
			});

			Accounts.onLoginFailure(function(){
				$('.close-landing-login').click();
				$('.landing-login-submit').unbind('click');
			});

		});	
	}


});

