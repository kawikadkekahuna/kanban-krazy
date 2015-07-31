var TO_DO_STATUS = "TO DO";
var IN_PROGRESS_STATUS = "IN PROGRESS";
var DONE_STATUS = "DONE";

Template.navigation.created = function() {
	console.log('navigation template');

};

Template.navigation.update = function() {
	console.log('updated');
};

Template.navigation.destroyed = function() {
	console.log('destroyed');
};

Template.navigation.onRendered(function() {
	$(document).foundation('reveal', 'reflow');
})

Template.navigation.helpers({

});

Template.navigation.events({

	'click .nav-add-task': function() {
		$('#addTaskModal').foundation('reveal', 'open');

			$('.add-task').click(function(event) {
				event.preventDefault();
				var taskTitle = $('.task-title').val();
				var taskDescription = $('.task-description').val()
				console.log('taskTitle', taskTitle);
				console.log('taskDescription', taskDescription);

				TasksCollection.insert({

					createdBy: Meteor.userId(),
					title: taskTitle,
					description: taskDescription,
					status: TO_DO_STATUS,
					show: true,
					created_at: Date.now()
				});

				console.log('loop count');
				$('.close-add-task').click();

				$( '.add-task').unbind( 'click' );

			});

	}



});