module.exports ={

	isActive: function(value){

		if(value == true){


			return 'checked';

		}else{



		}
	
	},
	select: function(selected,options){ 

		return options.fn(this).replace(RegExp(' value=\"'+selected+'\"'), '$&selected="selected"')
		.replace(new RegExp('>'+ selected + '</option>'),'selected="selected"$&');




	},

}