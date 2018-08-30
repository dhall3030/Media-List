const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema 

const MediaSchema = new Schema({

	title:{ 

		type: String, 
		required: true 
	},
	type:{ 

		type: String, 
		required: true 
	},
	description: {

		type: String, 
		required: true 

	},
	user: { 

		type: String, 
		required: true 


	},
	active:{

		type: Boolean,
		required: true


	},
	date: {

		type: Date, 
		default: Date.now 



	}



}); 


mongoose.model('media', MediaSchema);