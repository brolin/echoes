define(["jquery","underscore","backbone"],function(e,t,n){var r=n.View.extend({events:{"click .play-time":"onPlayTimeClick"},initialize:function(){this.$title=this.$(".yt-media-title"),this.$info=this.$(".track-info"),this.listenTo(this.model,"change:title",this.render)},render:function(e,t){var n=e.get("description"),r=this.make("img",{src:e.get("thumbnail").hqDefault});n=n.replace(/([0-9]*[0-9]*:*[0-9]*[0-9]:[0-9][0-9])/gim,"<button class='btn btn-mini play-time' data-time='$1'>$1</button>\r","gim"),this.$title.html(t),this.$info.empty().append(n).append(r)},onPlayTimeClick:function(n){var r=e(n.target),i=r.data("time"),s=t(i).hmsToSeconds();this.$info.find(".btn-info").removeClass("btn-info"),r.addClass("btn-info"),this.trigger("seek",s)}});return r})