
Template.radio.onRendered(function(){
  // create an empty player
  createPlayer();

});

Template.radio.events({
  "click .favorite-playlist": function(event, template){
    // TODO: finish creating favorite playlist.
  }
});

/*
* Global function that creates a spotify web player, (Play button) using the array of track objects
* provided.
*
* @param {array} tracks - An array of track objects
*/
createPlayer = function (tracks) {
  var stringOfTrackIds = "";

  if (tracks) {
    _.each(tracks, function(track, index) {
      var id = track.track.id;
      if(index === 0) {
        stringOfTrackIds += id;
        return;
      }
      stringOfTrackIds += "," + id;
    });
    Session.set('tracklist', stringOfTrackIds);
  } else {
    stringOfTrackIds = Session.get('tracklist') || "";
  }

  var playerIframe =
  '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:MUSIXIM:|TRACKS|" width="300" class="radio" allowtransparency="true"></iframe>';

  playerIframe = playerIframe.replace('|TRACKS|', stringOfTrackIds);

  $('#radio-container').html(playerIframe);

  $('.radio').hover(slideRadioUp, slideRadioDown);

};

/*
* Using jquery animate slides the radio up to show the playlist.
*
* @param {object} event - accepts the event object of the enter hover event.
*/
var slideRadioUp = function(event) {
  $(event.target).animate({
    height: "380px"
  }, 800);
};

/*
* Using jquery animate slides the radio down to hide the playlist.
*
* @param {object} event - accepts the event object of the leave hover event.
*/
var slideRadioDown = function(event) {
  $(event.target).animate({
    height: "80px",
  }, 800);
};
