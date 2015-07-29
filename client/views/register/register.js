Template.register.created = function(){
	console.log('register template');

};

Template.register.update = function(){
	console.log('updated');
};

Template.register.destroyed = function(){
	Router.go('/dashboard');
};


Template.register.helpers({

});

Template.register.events({

});

