define(["jquery","underscore","backbone","text!templates/playlist-search.html"],function(t,e,i,n){var s=i.View.extend({events:{"keyup input":function(t){this.filter=t.target.value,this.trigger("search:change",this.filter)},'click button[data-action="create"]':function(){var t=this.$("input[type=search]").val();this.setState("loading"),this.trigger("search:add",t)},"submit form":function(t){t.preventDefault()}},initialize:function(){this.listenTo(i,"app:add-to-playlist",this.render),this.filter=""},template:e.template(n),render:function(t){return t.query=this.filter,this.$el.html(this.template(t)),setTimeout(e.bind(function(){this.$("input").get(0).focus()},this),500),this},setState:function(t){this.$(".add-btn").button(t)},resetState:function(){this.setState("reset"),this.$("input[type]").val("")}});return s});