Template.sidebar.created = function() {
	// console.log('register template');
};

Template.sidebar.destroyed = function() {
	// Router.go('/dashboard');
};


Template.sidebar.onRendered(function() {
	$(document).foundation();
});

Template.sidebar.helpers({

});

Template.sidebar.events({

});