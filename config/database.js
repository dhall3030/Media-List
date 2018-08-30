if(process.env.NODE_ENV === 'production'){

	//module.exports = {mongoURI: 'mongodb://dorian:dorian5@ds125851.mlab.com:25851/vidjot-prod-dorian'}
	module.exports = require('./database_prod');
	
} else {


	
	//module.exports =  {mongoURI: 'mongodb://localhost/watchlist-dev'}
	module.exports = require('./database_dev');
	
}