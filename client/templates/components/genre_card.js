Template.genre_card.onRendered(function(){
  var genreIds = Session.get('genre-list');

  // check to see if this current genre is in their session play list.
  // if so show the added button.
  if (genreIds && genreIds.indexOf(this.data._id) >= 0) {
    this.$('#btn-add').addClass('hide');
    this.$('#btn-added').removeClass('hide');
  } else {
    this.$('#btn-add').removeClass('hide');
    this.$('#btn-added').addClass('hide');
  }

});

Template.genre_card.events({

  /*
  * Add a genre to the users play list.
  *
  * @param {object} Event - The window event object passed to the event handler
  * @param {object} Template - The instance of the template where the event fired.
  */
  "click .genre-add" : function(event, template) {
    var currentGenrelist = Session.get('genre-list');

    if (!currentGenrelist) {
      currentGenrelist = [];
    }
    currentGenrelist.push(this._id);

    Session.set('genre-list', currentGenrelist);

    $(event.currentTarget).toggleClass('hide');
    $(event.currentTarget.nextElementSibling).toggleClass('hide');
  },

  /*
  * Removes a genre from the users play list.
  *
  * @param {object} Event - The window event object passed to the event handler
  * @param {object} Template - The instance of the template where the event fired.
  */
  "click .genre-remove" : function(event, template) {
    var currentGenrelist = Session.get('genre-list');

    if (currentGenrelist) {
      var genreIndex = currentGenrelist.indexOf(this._id);
      while(genreIndex > -1) {
        currentGenrelist.splice(genreIndex, 1);
        genreIndex = currentGenrelist.indexOf(this._id);
      }
    }

    Session.set('genre-list', currentGenrelist);

    $(event.currentTarget).toggleClass('hide');
    $(event.currentTarget.previousElementSibling).toggleClass('hide');
  }
});
