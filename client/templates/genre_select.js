
Template.genre_select.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.genre_select.onRendered(function() {

  updateSelectedGenres();

});

Template.genre_select.events({
  /*
  * Starts the radio for the user based on the genres they have selected.
  *
  * @param {object} Event - The window event object passed to the event handler
  * @param {object} Template - The instance of the template where the event fired.
  */
  "click #btn-jam-out": function(event, template){
    var genreList = Session.get('genre-list');

    $('.load-spinner').show();
    Meteor.call('getTracksFromGenres', genreList, function(error, result) {

      createPlayer(result);
      $('.load-spinner').hide();
    });

    $.post('radio', { genreList: genreList });
  }
});


/* Because currently we are re-seeding the database of genres on every start up
* there are often times the session has old/stale IDs.
*
* When the page is rendered, calling this function will remove any id's
* in the users session that don't actually exist in the DB.
*
*/
var updateSelectedGenres = function(){
  var genreIds = Session.get('genre-list');
  if (!genreIds){
    return;
  }
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

  Session.set('genre-list', genreIds);
};
