Template.navigation.created = function(){
	console.log('navigation template');

};

Template.navigation.update = function(){
	console.log('updated');
};

Template.navigation.destroyed = function(){
	Router.go('/dashboard');
};


Template.navigation.helpers({

});

Template.navigation.events({

});

