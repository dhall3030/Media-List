const express= require('express'); 

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const passport = require('passport');

//Load User Model 
require('../models/User');
const User = mongoose.model('users'); 


exports.user_login = (req, res, next) =>{


	res.render('users/login');



}



exports.proccess_user_login = (req, res, next) =>{

	passport.authenticate('local', {

		successRedirect: '/media/index/1',
		failureRedirect: '/users/login',
		failureFlash: true

	})(req, res, next);



}


exports.user_register = (req, res, next) =>{


	res.render('users/register');


}



exports.proccess_user_register = (req, res, next) =>{

		
	let errors =[]; 

	if(req.body.password !=req.body.password2){


		errors.push({text:'Passwords do not match'});

	} 

	if(req.body.password.length < 4){


		errors.push({text:'Password must be at least 4 characters'});


	} 

	if(errors.length > 0){

		res.render('users/register', {

			errors: errors,
			name: req.body.name, 
			email: req.body.email, 
			password: req.body.password,
			password2: req.body.password2

		});



	}else{

		User.findOne({email: req.body.email})
		.exec()
		.then(user => {

			if(user){


				req.flash('error_msg','Email already registered'); 

				res.redirect('/users/register'); 

			}else{

				const newUser = new User( {

					name: req.body.name, 
					email: req.body.email,
					password: req.body.password

				});

				bcrypt.genSalt(10,(err,salt)=>{

					bcrypt.hash(newUser.password, salt,(err,hash)=>{

						if(err) throw err; 

						newUser.password = hash;

						newUser.save()
						.then(user => {

							req.flash('success_msg', 'You are now registered and can log in'); 

							res.redirect('/users/login'); 

						})
						.catch(err =>{

							console.log(err);
							return;

						})

					});

				});
				console.log(newUser); 

				//res.send('passed');
			}



		});

		


	}



}


exports.user_logout = (req, res, next) =>{


	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');


}