ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      "clientId": "ea56b81418334eb2b1387c34ee817e2d",
      "secret": "edc77ac454e046158e08a11eeabb7c49"
    }
  },
  { upsert: true }
);


Meteor.methods({

  /*
  *   Retrieves recommended tracks based on the provided genres.
  *
  */
  getTracksFromGenres : function(genreIds) {
    var spotifyApi = new SpotifyWebApi();
    var genres = [];
    var tracks = [];
    // get the genre object from each genreId
    _.each(genreIds, function(genreId){
      genres.push(Genres.findOne({ _id : genreId }));
    });

    if(!genres || genres.length <= 0) {
      return;
    }

    // currently just get the first list and a random song for each category.
    _.each(genres, function(genre) {
      var playlistQueryOptions = {
        country: 'US',
        limit : 1,
        offset: 0
      };

      var response = spotifyApi.getPlaylistsForCategory(genre.spotifyName, playlistQueryOptions);

      // check if Access Token was expired. If so, refresh token and call again.
      if (checkTokenRefreshed(response, spotifyApi)) {
        response = spotifyApi.getPlaylistsForCategory(genre.spotifyName, playlistQueryOptions);
      }

      // check if the api get call was successful
      if (!successfulApiGetResponse(response)) {
        // continue to next genre in each loop.
        return; // this does not return from method.call
      }
      
      var genrePlaylist = response.data.body.playlists;
      var selectedPlaylist = genrePlaylist.items.pop();

      if(!selectedPlaylist) {
        // continue to next genre in each loop.
        return; // this does not return from method.call
      }

      var trackQueryOptions = {
        limit : 25,
        offset : 0
      };

      var tracksResponse  = spotifyApi.getPlaylistTracks(selectedPlaylist.owner.id, selectedPlaylist.id, trackQueryOptions);

      if (checkTokenRefreshed(tracksResponse, spotifyApi)) {
        tracksResponse = spotify.getPlaylistTracks(selectedPlaylist.owner.id, selectedPlaylist.id, trackQueryOptions);
      }

      if (!successfulApiGetResponse(tracksResponse)) {
        // continue to next genre in each loop.
        return; // this does not return from method.call
      }

      var selectedTrack = tracksResponse.data.body.items.pop();
      if(!selectedTrack) {
        // TODO: probably should do something other than return, but for now we'll just continue like this normal
        return;
      }

      tracks.push(selectedTrack);

    });


    return tracks;
  }
});

var checkTokenRefreshed = function(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
};

var successfulApiGetResponse = function(response) {
  if(response.error) {
    console.log("There was an error with an API call. ", response.statusCode, response.error);
    return false;
  }
   return true;
};
