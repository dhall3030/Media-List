new Vue({el:"#app",data:{isActive:!1,windowWidth:0},methods:{openMenu:function(){this.isActive=!this.isActive,console.log("hello")},confirmDelete:function(e){confirm("Are you sure?")||e.preventDefault()}}});