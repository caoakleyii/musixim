Template.genre_card.events({

  /*
  * Add a genre to the users play list.
  *
  * Event - The window event object passed to the event handler
  * Template - The instance of the template where the event fired.
  */
  "click .genre-add" : function(event, template) {
    var currentPlaylist = Session.get('playlist');

    if (!currentPlaylist) {
      currentPlaylist = [];
    }
    currentPlaylist.push(this._id);

    Session.set('playlist', currentPlaylist);

    $(event.currentTarget).toggleClass('hide');
    $(event.currentTarget.nextElementSibling).toggleClass('hide');
  },

  /*
  * Removes a genre from the users play list.
  *
  * Event - The window event object passed to the event handler
  * Template - The instance of the template where the event fired.
  */
  "click .genre-remove" : function(event, template) {
    var currentPlaylist = Session.get('playlist');

    if (currentPlaylist) {
      var genreIndex = currentPlaylist.indexOf(this._id);
      while(genreIndex > -1) {
        currentPlaylist.splice(genreIndex, 1);
        genreIndex = currentPlaylist.indexOf(this._id);
      }
    }

    Session.set('playlist', currentPlaylist);

    $(event.currentTarget).toggleClass('hide');
    $(event.currentTarget.previousElementSibling).toggleClass('hide');
  }
});
