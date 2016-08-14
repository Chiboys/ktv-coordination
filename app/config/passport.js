'use strict';
var GithubStrategy = require('passport-github');
var User = require('../model/user.js');
module.exports = 
	function(passport){
		passport.serializeUser(function(id,done){
			done(null,id);
		});
		passport.deserializeUser(function(id,done){
			done(null,id);
		});
		passport.use(new GithubStrategy(
			{
				clientID:process.env.CLIENTID,
				clientSecret:process.env.SECRET,
				callbackURL:process.env.CALLBACKURL
			}	,
					function(accessToken,refreshToken,profile,done){
						User.findOne({id:profile.id},{_id:false},function(err,user){
							if(err){ throw err;}
							if(user){
								return done(null,user.id);
							}else{
								var newUser = new User();
								newUser.id = profile.id;
								newUser.searchWord = '';
								newUser.plan = [];
								newUser.save(function(err){
									if(err){ throw err;}
								});
								return done(null,newUser.id);
							}
						
						});
						
				}
		));

	}	