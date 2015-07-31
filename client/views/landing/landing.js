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

});

