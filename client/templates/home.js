
Template.home.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.home.onRendered(function() {
  var genreIds = Session.get('playlist');
  var i = genreIds.length;

  // iteratively loop in reverse to avoid skipping an index
  // when splicing on genres that no longer exist.
  while(i--) {

    var genreId = genreIds[i];
    var genre = Genres.find({ _id: genreId});

    if (!genre) {
      genreIds.splice(i, 1);
    }
  }

  Session.set('playlist', genreIds);

});

Template.home.events({
  "click #btn-jam-out": function(event, template){
    var genreList = Session.get('playlist');
    Router.go('radio', { genreList: genreList });
  }
});
