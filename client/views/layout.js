Template.layout.created = function() {
	// console.log('register template');
};

Template.layout.destroyed = function() {
	// Router.go('/dashboard');
};


Template.layout.onRendered(function() {
	$(document).foundation();
});

Template.layout.helpers({

});

Template.layout.events({

});