'use strict';
var ajaxFunctions = require('./ajaxFunction_server');
var User = require('../model/user');
module.exports = function(){
	this.searchInf = function(req,res){
		var url = 'http://api.duoyun.io/pdc'
			+'?partnerId='+process.env.partnerId
			+'&token='+process.env.token
			+'&apiId='+process.env.apiId
			+'&rn=15'
			+'&pn='+req.params.pn
			+'&fields=&cityName='
			+req.body.searchWord;
		var dataDeal = function(data){
			data = JSON.parse(data);
			if(data.resultcode !== 200 || data.data.total === 0){
				return res.end('0');
			}else{
				return res.json(data.data);
			}
		};
		ajaxFunctions.ajaxRequire('get',url,dataDeal);
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
};