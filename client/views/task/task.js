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

});

Template.task.helpers({

});

Template.task.events({

  'click .taskTitle': function(event, template) {

    $(document).foundation('reveal', 'reflow');

    $('.display_toggle').click(function(event) {

      event.preventDefault();

      if ($('.hover_display_container').hasClass('show')) {

        $('.hover_display_container').removeClass('show').addClass('hidden');
        $('.hover_edit_container').removeClass('hidden').addClass('show');

        $('.hover_edit_container').find('.title_input').val($(event.target).closest('div').find('.task_title').attr('value'));
        $('.hover_edit_container').find('.description_input').val($(event.target).closest('div').find('.task_description').attr('value'));
      }
    });

    $('.edit_toggle').click(function(event) {

      event.preventDefault();

      if ($('.hover_display_container').hasClass('hidden')) {

        $('.hover_display_container').removeClass('hidden').addClass('show');
        $('.hover_edit_container').removeClass('show').addClass('hidden');
      }
    });

    $('.delete_button').click(function(event) {

      event.preventDefault();

      TasksCollection.remove($(event.target).closest('div').find('.task_id').attr('value'));
      $('.task_title').unbind('click');
      $('.close-reveal-modal').click();
    });

    $('.update_button').click(function(event) {

        event.preventDefault();

        var newTitle = $(event.target).closest('.hover_edit_container').find('.title_input').val();
        var newDescription = $(event.target).closest('.hover_edit_container').find('.description_input').val();
        var task_id = $(event.target).closest('div').find('.task_id').attr('value');

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
      $('.task_title').unbind('click');

      // $('.edit_toggle').click();
      $('.close-edit-box').click();
      });
    },
    'mouseup .task' : function(event, template) {
      console.log('mouseup');
      $('.todoBody').fadeTo(200, 1);
      $('.inProgressBody').fadeTo(200, 1);
      $('.completeBody').fadeTo(200, 1);
    }
});

