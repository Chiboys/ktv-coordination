'use strict';
var GithubStrategy = require('passport-github');
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
				callbackURL:'http://127.0.0.1:8080/auth/github/callback'//process.env.CALLBACKURL
			}	,
					function(accessToken,refreshToken,profile,done){
						done(profile.id,done);
				
				}
		));

	}	