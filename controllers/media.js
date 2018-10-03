const express= require('express');
const mongoose = require('mongoose');
//Load Media Model 
require('../models/Media'); 
const Media = mongoose.model('media');


exports.media_get_all = (req, res, next) =>{


	 let pageNumber = Math.max(0, req.params.page)
	 let size = 5
 
	 let query={}

	 query.user = req.user.id
	 query.active = true


	 Media.find(query)
	 .sort({date: 'desc'})
	 .skip(size * (pageNumber -1))
	 .limit(size)
	 .exec()
	 .then(media=>{

		Media.count(query).exec(function(err, count) {

			let pageCount = Math.ceil(count / size)

			res.render('media/index-paginate', {

				media:media,
				pageNumber: pageNumber,
				pages: pageCount,
				pagination: { page: pageNumber, pageCount: pageCount}
			});

		});

	}).catch(err =>{


		console.log(err);


	});
	

}



exports.media_archive_get_all = (req, res, next) =>{


	let pageNumber = Math.max(0, req.params.page)
	let size = 5

	let query={}

	 query.user = req.user.id
	 query.active = false


	 Media.find(query)
	 .sort({date: 'desc'})
	 .skip(size * (pageNumber -1))
	 .limit(size)
	 .exec()
	 .then(media=>{

		Media.count(query).exec(function(err, count) {

			let pageCount = Math.ceil(count / size)

			res.render('media/archive-paginate', {

				media:media,
				pageNumber: pageNumber,
				pages: pageCount,
				pagination: { page: pageNumber, pageCount: pageCount}
			});

		});

	}).catch(err =>{


		console.log(err);


	});
	






}


exports.process_add_media = (req, res, next) =>{

	let errors =[];
	
	if(!req.body.title){

		errors.push({text:'Please add a title'});

	}
	if(!req.body.description){

		errors.push({text:'Please add a description'});

	}

	if(errors.length > 0){

		res.render('media/add',{

			errors: errors,
			title: req.body.title,
			description: req.body.description


			


		})

	}else{

		
		let active = false;

		if(req.body.active){
		 active = true;
		}


		const newMedia ={

			title: req.body.title,
			type: req.body.type,
			description: req.body.description,
			//add user ownership
			user: req.user.id,
			active: active 


		}

		new Media(newMedia)
		.save()
		.then(media =>{

			req.flash('success_msg','media item added sussessfully');
			//res.send('done!');
			res.redirect('/media/index/1');

		})
		.catch(err =>{


		console.log(err);


		});

		//console.log(req.body);
	    //res.send('ok');


	}

}


exports.edit_media = (req, res, next) =>{


	Media.findOne({

		_id: req.params.id

	})
	.exec()
	.then(media =>{ 

		if(req.user.id != media.user ){

			res.redirect('/media/index/1');

	    }else{


	    	res.render('media/edit',{


				media:media


			});


	    }
		


		


	})
	.catch(err =>{


		console.log(err);


	});



}




exports.process_edit_media = (req, res, next) =>{

	Media.findOne({

		_id: req.params.id

	})
	.exec()
	.then(media => {

		media.title = req.body.title,
		media.type = req.body.type;
		media.description = req.body.description; 

		
		if(req.body.active){
		media.active = true;
		}else{
		media.active = false;
		}
		
		
		media.save()
		.then(media=>{

			
			req.flash('success_msg','media item updated sussessfully');

			res.redirect('/media/index/1');

		})


	})
	.catch(err =>{


		console.log(err);


	});



}


exports.show_media = (req, res, next) =>{


	Media.findOne({

		_id: req.params.id

	})
	.exec()
	.then(media =>{ 

		if(req.user.id != media.user ){

			res.redirect('/media/index/1');

	    }else{


	    	res.render('media/show',{


				media:media


			});


	    }
		


		


	})
	.catch(err =>{


		console.log(err);


	});



}


exports.delete_media = (req, res, next) =>{



	Media.remove({_id: req.params.id})
		.exec()
		.then(()=>{

			req.flash('success_msg','Media item removed');

			res.redirect('/media/index/1');


		})
		.catch(err =>{


		console.log(err);


		});




}