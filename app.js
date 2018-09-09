const express = require('express'); 
const exphbs = require('express-handlebars'); 
const methodOverride = require('method-override');
const flash = require('connect-flash'); 
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const mongoose =require('mongoose');

//pagination helper
const paginate = require('handlebars-paginate');



const app = express();



//Load routes

const index = require('./routes/index');


const media = require('./routes/media');


const users = require('./routes/users');



//Handlebars Helpers 

const {

	isActive,
	select
	
} = require('./helpers/hbs');




//Passport Config 

require('./config/passport')(passport); 

//DB Config 

const db = require('./config/database');


//map global promise - get rid of warning 

mongoose.Promise = global.Promise;

//Connect to mongoose 
mongoose.connect(db.mongoURI, {

	useMongoClient: true

})
.then(() => console.log('MongoDB Connected...'))
.catch(err =>console.log(err));


//Handlebars Middleware

 app.engine('handlebars', exphbs({


 	helpers:{
 		
 		isActive: isActive, 
 		select: select,
 		paginate: paginate
 	
 	},
	defaultLayout: 'main'


 }));

 app.set('view engine', 'handlebars')


 //Body parser middleware 
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());





 

//set static folder

app.use(express.static(path.join(__dirname, 'public')));

//Method override middleware 
app.use(methodOverride('_method'));

// Express session middleware

app.use(session({

	secret: 'secret', 
	resave: true, 
	saveUninitialized: true


}));


//Passport middleware
app.use(passport.initialize()); 
app.use(passport.session());


// connect flash
app.use(flash());

//Global variables

app.use(function(req, res, next){

	res.locals.success_msg = req.flash('success_msg'); 
	res.locals.error_msg = req.flash('error_msg'); 
	res.locals.error = req.flash('error'); 
	res.locals.user = req.user || null;
	next();

});


//Use Routes 
app.use('/', index);

app.use('/media', media);

app.use('/users', users);



const port = process.env.PORT || 5000; 

app.listen(port, () => {

console.log(`Server started on port ${port}`)


}); 