define(["jquery","underscore","backbone","views/media_search","views/youtube_player","views/content_layout","views/feed_filter","views/youtube_playlists_provider","views/user_profile_manager","views/facebook/facebook_like_view","views/youtube/PlaylistsViewer","views/SidebarView","views/Loader","views/infinite_scroller","collections/history_playlist"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d){var v=n.View.extend({el:".container-main",initialize:function(){this.views={searchBar:new r({model:this.model}),youtubePlayer:new i({model:this.model}),contentView:new s({model:this.model}),searchFeedFilter:new o({model:this.model}),userPlaylists:new u({model:this.model,collection:this.model.user().playlists}),userProfileManager:new a({model:this.model}),facebookLikeView:new f({model:this.model}),sidebarToggle:new c({model:this.model}),loader:new h({model:this.model}),playlistsViewer:new l({model:this.model}),infiniteScroll:new p({el:this.$el,model:this.model})},e(window).on("resize",t.bind(this.setSize,this)),this.setSize(),this.setFirstTimeDialog(),this.addStyle()},setSize:function(){this.$el.height(t().getPortviewSize().height+10)},setFirstTimeDialog:function(){var t=localStorage.getItem("showFirstTime"),n=function(){e("#e-dialog").modal("hide")};t!=="false"&&(e("#e-dialog").find(".dont-remind").on("click",function(e){localStorage.setItem("showFirstTime","false"),n()}),e("#e-dialog").modal())},addStyle:function(){var n=t().addFeatures(),r=t().isFullScreen(),i=[];t().hasHiddenScroll()||i.push("styled-scrollbar"),n&&n.length&&i.push("ios"),r&&i.push("full-screen-app"),e("html").addClass(i.join(" "))}});return v});