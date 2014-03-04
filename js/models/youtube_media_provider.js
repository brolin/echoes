define(["underscore","backbone","./youtube_item_info","./youtube_playlist_info_provider","./youtube/ProfileService","collections/youtube/UserPlaylists"],function(e,t,n,r,i,s){var o="AI39si4_o0x9AELkUm2d2M30xfHzbgEjFtZgzV8C7Ydu2f6eRZ6XaYaRxD07qwEVBQkMiOK0pwOFbQ4M7sWl6jcJ7r102BsRJg",u=t.Model.extend({playlists:new s,profile:new i,defaults:{query:"",startIndex:1,maxResults:50,feedType:"videos"},info:new n,playlist:new r,safe:"echoesYoutubeProvider",initialize:function(){this.on("change:query change:startIndex",this.search,this)},onFeedTypeChange:function(){this.set({startIndex:1},{silent:!0}),this.fetch()},search:function(){this.fetch()},fetchNext:function(){var e=this.get("startIndex"),t=this.get("data").totalItems,n=e+this.get("data").itemsPerPage,r=t-n;r>0&&this.set("startIndex",n,{silent:!0}),this.fetch()},query:function(e){e.startIndex=e.startIndex||1,this.set(e)},urlRoot:function(){return"https://gdata.youtube.com/feeds/api/"+this.getFeedType()+"?q="+this.get("query")+"&alt=jsonc&v=2&start-index="+this.get("startIndex")+"&max-results="+this.get("maxResults")+"&key="+o},getFeedType:function(){var e=this.get("feedType");return e==="playlists"&&(e+="/snippets"),e==="playlist"&&(e+="/"+this.get("query")),e},validate:function(e){if(e.startIndex<0)return"start index should be greater than 1."},fetchMediaById:function(e){this.info.set("id",e)},fetchPlaylistInfo:function(e){this.playlist.set("id",e)},nextIndex:function(){var e=this.get("startIndex"),t=this.get("data").totalItems,n=e+this.get("data").itemsPerPage,r=t-n;r>0&&this.set("startIndex",n)},prevIndex:function(){var e=this.get("startIndex")-this.get("data").itemsPerPage;e>-1&&this.set("startIndex",e)}});return u});