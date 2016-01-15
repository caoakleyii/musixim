isSidebarOpen = false;

Template.sidebar.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  usersPlaylists: function() {
    var user = Meteor.user();

    if(!user){
      return [];
    }
    return ReactiveMethod.call('getPlaylists');
  }
});

Template.sidebar.events({
  "click .sidebar-menu-btn": function(event, template){
     $('.sidebar').animate({width:'toggle'}, 800);
     isSidebarOpen = !isSidebarOpen;
  },
  "click #sidebar-close" : function(event, template) {

  },
  "click #logout" : function(event, template) {
    $('body').addClass('sign-in-body');
    Meteor.logout();
  }
});
