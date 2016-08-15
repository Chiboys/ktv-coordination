'use strict';
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var dotenv = require('dotenv');
var passport_config = require('./app/config/passport');
var route = require('./app/routes/index');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();
//��password�����������ã�δ��

dotenv.load();

mongoose.connect(process.env.MONGOOSE_URLS||process.env.MONGOOSE_URL);

app.use(bodyparser.urlencoded({extended:false}))

app.use(session({
	secret:"secret",
	resave:false,
	saveUninitialized:true
		//session�ĺ��������������������ĺ���
}));

passport_config(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/config',express.static(process.cwd()+'/app/config'));
app.use('/controllers',express.static(process.cwd()+'/app/controllers'));

route(app,passport);

app.use('/html',express.static(process.cwd()+'/public'));
app.use('/js',express.static(process.cwd()+'/app'));

var port = process.env.PORT||8080;
app.listen(port,function(){
	console.log('listen to '+port);

});

