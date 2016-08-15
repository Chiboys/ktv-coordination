'use strict';
var ajaxFunctions = require('./ajaxFunction_server');
var User = require('../model/user');
var XmlHttp = require('xmlhttprequest').XMLHttpRequest;
var request = require('request');
module.exports = function(){
	this.searchInf = function(req,res){
		var r = request.get('http://api.duoyun.io/pdc', function optionalCallback(err, httpResponse, body) {
			console.log(httpResponse);
		});
		};
	this.dataStore = function(req,res,next){
		//使用本函数，请务必确认已认证；
		//存储查询的word 修改前端，使用form发送数据
		//,input set its name as searchWord，
		//建成输入的合法性
		//导入body-parser解析数据,
		var searchWord = req.body.searchWord ;
		User.findOne({'id':req.user},function(err,user){
			if(err){ throw err;}
			if(user){ 
				User.findOneAndUpdate({'id':req.id},{$set:{'searchWord':searchWord}},function(err,user){
					if(err){ throw err;}
					
				});	
			}	
		});
		next();
	};

}