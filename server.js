'use strict';
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var dotenv = require('dotenv');
var passport_config = require('./app/config/passport');
var route = require('./app/routes/index');
var app = express();
//��password�����������ã�δ��

dotenv.load();

app.use(session({
	secret:"secret",
	resave:false,
	saveUninitialized:true
		//session�ĺ��������������������ĺ���
}));

passport_config(passport);
app.use(passport.initialize());
app.use(passport.session());

route(app,passport);

app.use('/html',express.static(process.cwd()+'/public'));
app.use('/js',express.static(process.cwd()+'/app'));
//û�е���denv�������ñ���PORT
var port = process.env.PORT||8080;
app.listen(port,function(){
	console.log('listen to '+port);

});

