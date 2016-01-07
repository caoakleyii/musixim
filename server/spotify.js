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
    _.each(genreIds.genres, function(genreId) {
      var genre = Genres.findOne({ _id : genreId });
      if (genre) {
        genres.push(genre);
      }
    });

    if(!genres || genres.length <= 0) {
      return;
    }

    // currently just get the first list and a random song for each category.
    _.each(genres, function(genre) {

      var selectedPlaylists = getRandomPlaylists(genre, 10);

      if(!selectedPlaylists) {
        // continue to next genre in each loop.
        // TODO: think of something better.
        return; // this does not return from method.call
      }

      tracks = getRandomTracks(selectedPlaylists, 25);

      if (!tracks) {
        return;
      }

    });


    return tracks;
  }
});

var getRandomPlaylists = function(genre, amount){
  var spotifyApi = new SpotifyWebApi();
  var selectedPlaylists = [];

  var playlistQueryOptions = {
    country: 'US'
  };

  var response = spotifyApi.getPlaylistsForCategory(genre.spotifyName, playlistQueryOptions);

  // check if Access Token was expired. If so, refresh token and call again.
  if (checkTokenRefreshed(response, spotifyApi)) {
    response = spotifyApi.getPlaylistsForCategory(genre.spotifyName, playlistQueryOptions);
  }

  // check if the api get call was successful
  if (!successfulApiGetResponse(response)) {
    return undefined;
  }

  var playlists = response.data.body.playlists;

  if (amount > playlists.total) {
    amount = playlists.total;
  }

  var previousIndexes = [];
  console.log(playlists.total);
  while(selectedPlaylists.length < amount) {
    var randomIndex;
    var indexFound = false;
    while (!indexFound) {
      randomIndex = randomNumber(0, playlists.total);
      if (typeof previousIndexes[randomIndex] !== "number"){
        indexFound = true;
      }
    }

    previousIndexes[randomIndex] = 1;
    console.log(randomIndex);
    selectedPlaylist = playlists.items[randomIndex];
    selectedPlaylists.push(selectedPlaylist);
  }


  if (!selectedPlaylists || selectedPlaylists.length <= 0) {
    return undefined;
  }

  return selectedPlaylists;
};

var getRandomTracks = function(selectedPlaylists, amount){
  var tracks = [];
  console.log(selectedPlaylists);
  while(tracks.length < amount) {
    tracks = tracks.concat(_.map(selectedPlaylists, getRandomTrack));
  }

  return tracks;
};


var getRandomTrack = function(selectedPlaylist){
  if (!selectedPlaylist) {
    return;
  }
  var spotifyApi = new SpotifyWebApi();
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

  var playlistTracks = tracksResponse.data.body;

  // Find random index to choose the track(song)
  var previousIndexes = [];
  var randomIndex;
  var indexFound = false;
  while (!indexFound) {
    randomIndex = randomNumber(0, playlistTracks.total);
    if (typeof previousIndexes[randomIndex] !== "number"){
      indexFound = true;
    }
  }
  previousIndexes[randomIndex] = 1; // TODO: currently not accurate,
  // would have to create a previous
  // index specific to each playlist

  var selectedTrack = playlistTracks.items[randomIndex];
  if (!selectedTrack) {
    return;
  }

  return selectedTrack;
};

/**
* Returns a true or false value determining if the passed spotify api response
* was successful and if needed to have the access token refreshed.
* If the response was not successful, this will refresh the token
*
* @param {number} Response   - The response message to be checked.
*/
var checkTokenRefreshed = function(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
};

/**
* Returns a true or false value determining if the passed response is a
* successful get response. If the response was not successful, this will log
* the error message and status code.
*
* @param {number} Response   - The response message to be checked.
*/
var successfulApiGetResponse = function(response) {
  if(response.error) {
    console.log("There was an error with an API call. ", response.statusCode, response.error);
    return false;
  }
  return true;
};

/**
* Generates a random number using Math.random() using the provided range.
*
* @param {number} lowerBound - Lower bound is inclusive.
* @param {number} upperBound - Upper bound is inclusive
*/
var randomNumber = function(lowerBound, upperBound){
  return Math.floor((Math.random() * (upperBound + 1)) + lowerBound);
};
