'use strict';

Template.task.created = function() {

};

Template.task.update = function() {

};

Template.task.destroyed = function() {

};

Template.task.rendered = function() {

  $(document).foundation('accordion', 'reflow');
  $(document).foundation('reveal', 'reflow');
}

Template.task.onRendered(function() {
  $(document).foundation('reveal', 'reflow');
  var todo_tasks = $('.todoBody').find('.left_button').hide();
  var done_tasks = $('.completeBody').find('.right_button').hide();

});

Template.task.helpers({

});

Template.task.events({

  'click .show_edit': function(event, template) {

    event.preventDefault();


  },

  'click .delete_button': function(event, template) {

    event.preventDefault();

    TasksCollection.remove($(event.target).closest('.task').find('.task_id').attr('value'));
  },

  'click .edit_button': function(event, template) {


    $('.update_button').click(function(event) {

      event.preventDefault();

      var newTitle = $(event.target).closest('.reveal-modal').find('.title_input').val();
      var newDescription = $(event.target).closest('.reveal-modal').find('.description_input').val();
      var task_id = $(event.target).closest('div').find('.task_id').attr('value');

      console.log(task_id);
      console.log(newTitle);
      console.log(newDescription);

      if (newTitle === "" && newDescription === "") {
        return;
      }
      if (newTitle === "") {

        TasksCollection.update(task_id, {
          $set: {
            description: newDescription
          }
        });
      } else if (newDescription === "") {

        TasksCollection.update(task_id, {
          $set: {
            title: newTitle
          }
        });
      } else {

        TasksCollection.update(task_id, {
          $set: {
            title: newTitle,
            description: newDescription
          }
        });
      }
      $('.close-edit-box').click();

    });

  },
  'mouseup .task': function(event, template) {
    console.log('mouseup');
    $('.todoBody').fadeTo(200, 1);
    $('.inProgressBody').fadeTo(200, 1);
    $('.completeBody').fadeTo(200, 1);
  }
});