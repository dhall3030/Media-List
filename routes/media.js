const express= require('express'); 

const mongoose = require('mongoose');

const router = express.Router(); 

const {ensureAuthenticated} = require('../helpers/auth');


//Load Media Model 

require('../models/Media'); 


const Media = mongoose.model('media');



//Media Index 

router.get('/',ensureAuthenticated, (req , res) => {
	 //Media.find({})

	 Media.find({user: req.user.id, active: true})
	 .sort({date: 'desc'})
	 .then(media=>{

		res.render('media/index', {

			media:media

		});

	});
	

	

});

//Archive route
router.get('/archive',ensureAuthenticated, (req , res) => {
	 //Media.find({})

	 Media.find({user: req.user.id, active: false})
	 .sort({date: 'desc'})
	 .then(media=>{

		res.render('media/archive', {

			media:media

		});

	});
	

	

});




// Add Media Form 

router.get('/add',ensureAuthenticated,(req , res) => {

	
	

	res.render('media/add');

});


//Process Media Form 

router.post('/',ensureAuthenticated,(req , res) => {

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
			res.redirect('/media');

		})

		//console.log(req.body);
	    //res.send('ok');


	}



	

});


// Edit Media Form 

router.get('/edit/:id',ensureAuthenticated ,(req , res) => {

	
	Media.findOne({

		_id: req.params.id

	})
	.then(media =>{ 

		if(req.user.id != media.user ){

			res.redirect('/media');

	    }else{


	    	res.render('media/edit',{


				media:media


			});


	    }
		


		


	});



	

});

//edit Form Process



router.put('/:id',ensureAuthenticated,(req , res)=>{ 

	Media.findOne({

		_id: req.params.id

	})
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

			res.redirect('/media');

		})


	});



});

//show media
router.get('/show/:id',ensureAuthenticated ,(req , res) => {

	
	Media.findOne({

		_id: req.params.id

	})
	.then(media =>{ 

		if(req.user.id != media.user ){

			res.redirect('/media');

	    }else{


	    	res.render('media/show',{


				media:media


			});


	    }
		


		


	});



	

});


//Delete Idea 

router.get('/delete/:id',ensureAuthenticated,(req, res)=>{


	

	Media.remove({_id: req.params.id})
		.then(()=>{

			req.flash('success_msg','Media item removed');

			res.redirect('/media');


		})

});



module.exports = router; 