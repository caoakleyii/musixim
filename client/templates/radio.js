
Template.radio.onRendered(function(){

  Meteor.call('getTracksFromGenres', this.data, function(error, result) {
    $('.load-spinner').hide();
    createPlayer(result);

  });

});

Template.radio.events({
  "click #foo": function(event, template){

  }
});

/*
* Creates a spotify web player, (Play button) using the array of track objects
* provided.
*
* @param {array} tracks - An array of track objects
*/
var createPlayer = function (tracks) {
  var stringOfTrackIds = "";

  _.each(tracks, function(track, index) {
    var id = track.track.id;
    if(index === 0) {
      stringOfTrackIds += id;
      return;
    }
    stringOfTrackIds += "," + id;
  });
  var playerIframe =
  '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:MUSIXIM:|TRACKS|" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>';

  playerIframe = playerIframe.replace('|TRACKS|', stringOfTrackIds);

  $('#radio-container').html(playerIframe);
};
