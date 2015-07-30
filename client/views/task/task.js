'use strict';

// var DEFAULT_STATUS = "TO DO";
// var TO_DO_STATUS = "TO DO";
// var IN_PROGRESS_STATUS = "IN PROGRESS";
// var DONE_STATUS = "DONE";

var IS_DRAGGING = false;

Template.task.created = function() {

  // $(".details_div").hide();
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

  // tasks_to_do: function() {
  //   return TasksCollection.find({
  //     status: "TO DO"
  //   });
  // },

  // tasks_in_progress: function() {
  //   return TasksCollection.find({
  //     status: "IN PROGRESS"
  //   });

  // },
  // tasks_done: function() {
  //   return TasksCollection.find({
  //     status: "DONE"
  //   });
  // }
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
      $('.close-reveal-modal').click();
    });

    $('.update_button').click(function(event) {
        event.preventDefault();
        console.log($(event.target).closest('div'));
        var newTitle = $(event.target).closest('div').find('.task_title').val();
        var newDescription = $(event.target).closest('div').find('.task_description').val();
        var task_id = $(event.target).closest('div').find('.task_id').attr('value');
        console.log(task_id);
        console.log(newTitle);
        console.log(newDescription);
        if (newTitle === "" && newDescription === "") {
          return;
        }
        if (newTitle === "") {
          console.log("1");
          TasksCollection.update(task_id, {
            $set: {
              description: newDescription
            }
          });
        } else if (newDescription === "") {
          console.log("2");
          TasksCollection.update(task_id, {
            $set: {
              title: newTitle
            }
          });
        } else {
          console.log("3");
          TasksCollection.update(task_id, {
            $set: {
              title: newTitle,
              description: newDescription
            }
          });
        }
      $('.edit_toggle').click(); $('.close-reveal-modal').click();
      });

    },
    'mouseup .task' : function(event, template) {
      console.log('mouseup');
      $('.todoBody').fadeTo(200, 1);
      $('.inProgressBody').fadeTo(200, 1);
      $('.completeBody').fadeTo(200, 1);    
    }
  


});
