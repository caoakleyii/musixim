
Router.configure({
  // we use the  layout template to define the layout for the entire app
  layoutTemplate: 'layout',

  // the appNotFound template is used for unknown routes and missing lists
  //notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  //loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('genres'),
    ];
  }
});

Router.route('/', function(){
  this.render('home');
}, { name: 'home' });

Router.route('/genres', function(){
  var genres = Genres.find({});
  this.render('genre_select', {data: {genres: genres} });
}, { name: 'genre_select'});
