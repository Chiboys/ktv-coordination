'use strict';
var searchUtil = require('../common/searchInf_dataStore');
module.exports = function(app,passport){
	var base = process.cwd();
	var cache = null;
	var isLogIn = function(req,res,next){
		if(req.isAuthenticated()){
			next();
		}else{
			res.redirect('/login');
		}
	}
	app.get('/',function(req,res){
		res.sendFile(base+'/public/index.html');
			});
			//这里的话，我想来个在client加个初始化
	app.get('/login',passport.authenticate('github'));
	app.get('/auth/github/callback',passport.authenticate('github',{
		failureRedirect:'/'
			}),function(req,res){
				res.redirect('/');
			});
	app.get('/search/:pn',function(req,res,next){
		if(req.isAuthenticated()){
			searchUtil.dataStore(req,res,next);
			console.log('dataStore')
				next();
		}else{
			next();
			console.log('not login');
		}
	},function(req,res){
		console.log('dataSearcher');
		res.end('');
	});

}