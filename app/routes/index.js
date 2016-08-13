'use strict';
module.exports = function(app,passport){
	var base = process.cwd();
			app.get('/auth/github/callback',passport.authenticate('github',{
				failureRedirect:'/'
			}),function(req,res){
				//res.sendFile(base+'/public/index.html');
				res.sendFile(base+'/public/index.html');
				//res.end(req.user);
			});
			app.get('/login',passport.authenticate('github'));
			app.get('/',function(req,res){
				res.sendFile(base+'/public/index.html');
			});
			
	}