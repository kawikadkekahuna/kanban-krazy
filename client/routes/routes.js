Router.route('/')
  .get(function() {

    this.render('index');

  });

Router.route('/dashboard')
  .get(function() {

    if(!Meteor.user()) {

      this.render('index');
    }

  });