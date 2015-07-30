'use strict';

// var DEFAULT_STATUS = "TO DO";
// var TO_DO_STATUS = "TO DO";
// var IN_PROGRESS_STATUS = "IN PROGRESS";
// var DONE_STATUS = "DONE";

var IS_DRAGGING = false;

Template.task.created = function() {

  // $(".details_div").hide();
};

Template.task.update = function(){

};

Template.task.destroyed = function(){

};

Template.task.rendered = function(){

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

    console.log('taskTitle clicked');

    // $(document).foundation('dropdown', 'reflow');
    $(document).foundation('reveal', 'reflow');

    //edit button
    $('.display_toggle').click(function(event) {

      event.preventDefault();
      console.log('display_toggle clicked');

      if($('.hover_display_container').hasClass('show')) {

        $('.hover_display_container').removeClass('show').addClass('hidden');
        $('.hover_edit_container').removeClass('hidden').addClass('show');
      }
    });

    $('.edit_toggle').click(function(event) {

      event.preventDefault();
      console.log('edit_toggle clicked');

      if($('.hover_display_container').hasClass('hidden')) {

        $('.hover_display_container').removeClass('hidden').addClass('show');
        $('.hover_edit_container').removeClass('show').addClass('hidden');
      }
    });

    $('.delete_button').click(function(event) {

      event.preventDefault();

      console.log($(event.target).closest('div').find('.task_id').attr('value'));

      TasksCollection.remove($(event.target).closest('div').find('.task_id').attr('value'));
      $('.close-reveal-modal').click();
    });
  },

  //UPDATE Title/Description
  'click .update_button': function(event, template) {

    event.preventDefault();

    var newTitle = template.find('.title_input').value;
    var newDescription = template.find('.description_input').value;

    if (newTitle === "" && newDescription === "") {

      return;
    }

    if (newTitle === "") {

      TasksCollection.update(this._id, {
        description: newDescription
      });

    } else if (newDescription === "") {

      TasksCollection.update(this._id, {
        title: newTitle
      });

    } else {

      TasksCollection.update(this._id, {
        title: newTitle,
        description: newDescription
      });
    }

    template.find('.title_input').value = "";
    template.find('.description_input').value = "";
  },

  //DELETE
  'click .delete_button': function(event, template) {

    event.preventDefault();

    TasksCollection.remove(this._id);
  },
  
  'mouseup .task': function(event, template) {
    console.log('mouseup');
      $('.todoBody').fadeTo(200, 1);
      $('.inProgressBody').fadeTo(200, 1);
      $('.completeBody').fadeTo(200, 1);    
  }
});