Meteor.methods({
  createPlaylist : function(playlist) {
    var user = Meteor.user();
    if (!user){
      return;
    }
    playlist.user = user._id;

    Playlists.insert(playlist);
  },
  getPlaylists : function() {
    var user = Meteor.user();
    if (!user) {
      return;
    }
    var list = Playlists.find({ user : user._id }).fetch();
    return list;
  }
});
