define(["jquery","underscore","backbone","./youtube/track_info","./youtube/playlist_info","text!templates/youtube_custom_styles.css"],function(e,t,n,r,i,s){var o=n.View.extend({el:"#youtube-player-container",events:{"click .show-player":"show","click .pause":"pause","click .play":"playVideo","click .volume-down":"decreaseVolume","click .volume-up":"increaseVolume","click .next":"playNext","click .previous":"playPrevious","click .fullscreen":"toggleFullScreen","mouseout .volume-down":"hideVolume","mouseout .volume-up":"hideVolume","mouseout .volume-meter":"hideVolume","mouseover .volume-down":"showVolume","mouseover .volume-up":"showVolume","mouseover .volume-meter":"showVolume"},initialize:function(){this.playerModel=this.model.get("player"),this.listenTo(this.playerModel,"change:mediaId",this.onMediaChanged),this.listenTo(this.playerModel,"change:index",this.playMedia),this.currentTrackInfoView=new r({el:this.$(".current-track-info-container"),model:this.model.youtube().get("info")}),this.currentPlaylistView=new i({el:this.$(".playlist-info"),model:this.model}),this.listenTo(this.currentTrackInfoView,"seek",this.seekToSeconds),e(window).on("resize",t.bind(this.insertCustomStyles,this)),window.onYouTubeIframeAPIReady=t.bind(this.createPlayer,this);var n=require(["http://www.youtube.com/iframe_api?&ghost="],function(){})},createPlayer:function(){var e=this.playerModel.get("size");this.player=new YT.Player("player",{height:String(e.height),width:String(e.width),playerVars:{autoplay:0,enablejsapi:1,autohide:0,controls:1,fs:1,modestbranding:1},events:{onReady:t.bind(this.onPlayerReady,this),onStateChange:t.bind(this.onPlayerStateChange,this)}})},onPlayerReady:function(){this.queue&&this.play(this.queue)},onPlayerStateChange:function(e){var n,r;e.data===YT.PlayerState.PAUSED&&this.toggleNowPlaying(!1),e.data===YT.PlayerState.PLAYING&&(n=this.playerModel.get("mediaId"),this.playerModel.isCurrentPlaylist()&&(r=this.player.getPlaylistIndex(),r=r===-1?0:r,this.model.youtube().fetchPlaylistInfo(n),n=this.player.getPlaylist()[r],this.updateIndex(r)),this.model.youtube().fetchMediaById(n),this.toggleNowPlaying(!0)),t.once(t.bind(this.setVolume,this))},onMediaChanged:function(e,t){this.play(e)},play:function(e){if(!this.player||!this.player.loadVideoById){this.show(),this.queue=e;return}this.player.stopVideo(),this.player.clearVideo&&this.player.clearVideo(),this.playMedia(e),this.$el.addClass("yt-playing"),this.show(null,"show")},updateIndex:function(e){this.playerModel.set("index",e)},playMedia:function(e){e.isCurrentPlaylist()?this.playPlaylist(e.getPlaylistId(),e.getPlaylistCurrentIndex()):this.player.loadVideoById(e.get("mediaId"))},pause:function(){this.player.pauseVideo()},playVideo:function(){this.player.playVideo()},playPlaylist:function(e,n){var r;if(!this.player){this.play(this.model.get("player"));return}r=this.player.getPlaylistId();if(!t.isNull(r)&&e===r){this.player.playVideoAt(n);return}this.player.loadPlaylist&&this.player.loadPlaylist({list:e,listType:"playlist",index:n,suggestedQuality:"large"})},decreaseVolume:function(){this.updateVolume(this.player.getVolume()-5),this.showVolume()},increaseVolume:function(){this.updateVolume(this.player.getVolume()+5),this.showVolume()},setVolume:function(){this.updateVolume(this.player.getVolume())},updateVolume:function(e){e<0&&(e=0),e>=100&&(e=100),this.player.setVolume(e),this.$el.find(".volume-meter").html(Math.round(Math.abs(e)))},hideVolume:function(){this.$el.addClass("hide-volume")},showVolume:function(){this.$el.removeClass("hide-volume")},playNext:function(){this.player.nextVideo()},playPrevious:function(){this.player.previousVideo()},toggleFullScreen:function(){var e=this.playerModel,t=e.getSize();e.toggleFullScreen(),this.player.setSize(t.width,t.height),this.$el.toggleClass("fullscreen",e.get("fullScreen"))},toggleNowPlaying:function(e){this.$el.toggleClass("yt-playing",e)},show:function(e,t){e&&e.preventDefault(),!this.visible||t==="show"?(this.$el.addClass("show-youtube-player"),this.visible=!0):this.hide(e)},hide:function(e){e&&e.preventDefault(),this.$el.removeClass("show-youtube-player"),this.visible=!1},insertCustomStyles:function(){var e=t().getPortviewSize(),n=this.$("#youtube-full-screen");customStyle=t.template(s,e),n.length?n.replaceWith(customStyle):this.$el.append(customStyle)},seekToSeconds:function(e){this.player.seekTo(e,!0)}});return o});