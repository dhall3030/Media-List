new Vue({
    el: '#app',

    data: {
          isActive: false,
          windowWidth: 0
    },
    methods: {
        openMenu: function(){
            this.isActive = !this.isActive;
            console.log('hello');
          
        },
        confirmDelete: function(event) {

          if(!confirm("Are you sure?")){

            event.preventDefault();

          } 

          //console.log('delete clicked');
            
          
      

        }
        
    
    }
})