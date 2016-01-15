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

    var genreIndex = currentGenrelist.indexOf(this._id);

    if(genreIndex > -1) {
      // remove that genre from the list
      while(genreIndex > -1) {
        currentGenrelist.splice(genreIndex, 1);
        genreIndex = currentGenrelist.indexOf(this._id);
      }
    } else {
      // add the genre to the list
      currentGenrelist.push(this._id);
    }

    // update the genre list
    Session.set('genre-list', currentGenrelist);

    $(template.firstNode).find('#btn-add').toggleClass('hide');
    $(template.firstNode).find('#btn-added').toggleClass('hide');
  }
});
