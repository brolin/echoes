define(["underscore","backbone","../gapi"],function(t,e,i){var s=i.extend({url:function(){return gapi.client.youtube.playlistItems},scopes:"https://www.googleapis.com/auth/youtube",client:{api:"youtube",version:"v3"},initialize:function(){},methods:{list:{part:"snippet",maxResults:50,playlistId:""},insert:{part:"snippet",resource:{snippet:{playlistId:"",resourceId:{videoId:"",playlistId:"",kind:"youtube#video"}}}}},defaults:{},setId:function(t){this.methods.list.playlistId=t},hasId:function(){return""!==this.methods.list.playlistId},insert:function(t,e){var i=this.methods.insert.resource.snippet;i.playlistId=t,i.resourceId.videoId=e,i.resourceId.playlistId=t,this.sync("create",this)}});return s});