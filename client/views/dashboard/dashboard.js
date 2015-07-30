'use strict';

var DEFAULT_STATUS = "TO DO";
var TO_DO_STATUS = "TO DO";
var IN_PROGRESS_STATUS = "IN PROGRESS";
var DONE_STATUS = "DONE";
var OPACITY_FADE = 0.33;
var OPACITY_BRIGHTEN = 1;
var OPACITY_SPEED = 200;


Template.dashboard.created = function() {

  $(".details_div").hide();
};

Template.dashboard.update = function(){

};

Template.dashboard.destroyed = function() {

};

Template.dashboard.rendered = function() {

  $(document).foundation('accordion', 'reflow');
  $(document).foundation('reveal', 'reflow');
}

Template.dashboard.onRendered(function() {

  dragula([document.querySelector('.todoBody'), document.querySelector('.inProgressBody'), document.querySelector('.completeBody')], {
      direction: 'vertical',
      revertOnSpill: true,
      delay: 100
    })
    .on('drop', function(el, container, source) {
      console.log('drop');
      container = container.className.split(' ')[0];
      source = source.className.split(' ')[0];

      console.log('container', container);
      console.log('source', source);

      $('.' + container).fadeTo(OPACITY_SPEED, OPACITY_BRIGHTEN);

      $('.' + source).fadeTo(OPACITY_SPEED, OPACITY_BRIGHTEN);

      var id = Blaze.getData(el)._id;

      switch (container) {
        case 'todoBody':
          TasksCollection.update(id, {
            $set: {
              status: TO_DO_STATUS
            }
          });
          break;
        case 'inProgressBody':
          TasksCollection.update(id, {
            $set: {
              status: IN_PROGRESS_STATUS
            }
          });
          break;
        case 'completeBody':
          TasksCollection.update(id, {
            $set: {
              status: DONE_STATUS
            }
          });
          break;
      }
    })
    .on('drag', function(el, container, source) {
      console.log('drag');
      container = container.className.split(' ')[0];
      console.log('container', container);

      $('.' + container).fadeTo(OPACITY_SPEED, OPACITY_FADE);
    });


});


Template.dashboard.helpers({

  tasks_to_do: function() {
    return TasksCollection.find({
      status: "TO DO"
    });
  },

  tasks_in_progress: function() {
    return TasksCollection.find({
      status: "IN PROGRESS"
    });

  },
  tasks_done: function() {
    return TasksCollection.find({
      status: "DONE"
    });
  }
});

Template.dashboard.events({

  //DETAILS
  'click .taskTitle': function(event, template) {

    // $(document).foundation('dropdown', 'reflow');
    $(document).foundation('reveal', 'reflow');
  },

  // CREATE
  // 'click .create_button': function(event, template) {


  // },

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

  //UPDATE status LEFT
  'click .left_button': function(event, template) {

    event.preventDefault();

    switch (this.status) {

      case TO_DO_STATUS:
        break;
      case IN_PROGRESS_STATUS:
        TasksCollection.update(this._id, {
          $set: {
            status: TO_DO_STATUS
          }
        });
        break;
      case DONE_STATUS:
        TasksCollection.update(this._id, {
          $set: {
            status: IN_PROGRESS_STATUS
          }
        });
        break
    }
  },

  //UPDATE status RIGHT
  'click .right_button': function(event, template) {

    event.preventDefault();
    switch (this.status) {

      case TO_DO_STATUS:
        TasksCollection.update(this._id, {
          $set: {
            status: IN_PROGRESS_STATUS
          }
        });
        break;
      case IN_PROGRESS_STATUS:
        TasksCollection.update(this._id, {
          $set: {
            status: DONE_STATUS
          }
        });
        break;
      case DONE_STATUS:
        break;

    }

  },

  //DELETE
  'click .delete_button': function(event, template) {

    event.preventDefault();

    TasksCollection.remove(this._id);
  },

  'click .submitButton ': function(event, template) {

    event.preventDefault();
    var newTitle = template.find('.title_input').value;
    var newDescription = template.find('.description_input').value;
    var newStatus = DEFAULT_STATUS;

    if (newTitle === "" && newDescription === "") {

      return;
    }

    TasksCollection.insert({

      createdBy: Meteor.userId(),
      title: newTitle,
      description: newDescription,
      status: newStatus,
      show: true,
      created_at: Date.now()
    });

    template.find('.title_input').value = "";
    template.find('.description_input').value = "";
  },
  'click .display_toggle': function(event,template) {

    event.preventDefault();

    // if($('.hover_display_container').hasClass('show')) {

    //   $('.hover_display_container').removeClass('show').addClass('hidden');
    //   $('.hover_edit_container').removeClass('hidden').addClass('show');
    // }
  },

  'click .edit_toggle': function(event, template) {

    event.preventDefault();

    if ($('.hover_display_container').hasClass('hidden')) {

      $('.hover_display_container').removeClass('hidden').addClass('show');
      $('.hover_edit_container').removeClass('show').addClass('hidden');
    }
  }
});