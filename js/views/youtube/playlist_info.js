define(["jquery","underscore","backbone","text!templates/youtube_playlist_provider_item.html"],function(e,t,i,d){var n=i.View.extend({template:t.template(d),initialize:function(){this.playerModel=this.model.get("player"),this.listenTo(this.model.youtube.playlist,"done",this.render),this.listenTo(this.playerModel,"change:index",this.updateIndex),this.listenTo(this.model.youtube.info,"change:id",this.ensureSelectedIndex)},render:function(e,i){if(e){this.playlistId=i.id,this.currentIndex=this.playerModel.get("index");var d=t.map(e,this.makeListItem,this);this.$el.html(d.join(""))}},makeListItem:function(e,i){var d="";if(e){d=e&&e.video&&e.video.thumbnail?e.video.thumbnail.hqDefault||e.video.thumbnail.sqDefault:"";var n=e&&e.video?e.video.duration:0;return this.template({id:e.video.id,title:e.video.title,index:i,position:e.position,playlistId:this.playlistId,current:i===this.currentIndex?"active":"",thumb:d,time:t(n).secondsToHms()})}},updateIndex:function(e,t){this.currentIndex=t,this.$(".active").removeClass("active").end().find(".track-"+t).addClass("active")},ensureSelectedIndex:function(e){this.$(".active").removeClass("active"),this.$(".playlist-provider-item[data-videoid="+e.id+"]").addClass("active")}});return n});