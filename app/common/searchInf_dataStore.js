'use strict';
var User = require('../model/user');
var XmlHttp = require('xmlhttprequest').XMLHttpRequest;
module.exports = function(){

	this.searchInf  = function(req,res){
		var query = req.params.searchWord;
//		var page = 0;
//		if(req.query.offset){
//			if(parseInt(req.query.offset) >= 1){
//				page  = parseInt(req.query.offset)-1 ;
//			}
//		}
//		var start = page * 10;
		var start = 0;
		console.log(query);
		var url = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q="+query+"&offset="+start+"&count=20&mkt=zh-CN&safeSearch=Moderate";
//		var origUrl = req.get("host")+req.originalUrl;
//		collect.insert({url:origUrl},function(err){
//			if(err) {throw err};
//		});
		var xmlhttp = new XmlHttp();
		xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			 var data;
			if(xmlhttp.responseText){
				data = JSON.parse(xmlhttp.responseText).value;
				var simplify = data.map(function(ele){
					var obj = {
						"name":ele.name,
						"thumbnailUrl":ele.thumbnailUrl,
						"contentUrl":ele.contentUrl,
						"pageUrl":ele.hostPageUrl
						};
						return obj;
				});	
				data = {value:simplify,message:'got the result.',searchWord:query};
				res.json(data);
			}else{
				data={value:null,message:'no result.',searchWord:query}
				res.json(data);
			}
			
         }
      };
		xmlhttp.open("GET",url,true);
		xmlhttp.setRequestHeader("Ocp-Apim-Subscription-Key",process.env.bkey);
		xmlhttp.send();
      };
	this.dataStore = function(req,res){
		//使用本函数，请务必确认已认证；
		//存储查询的word 修改前端，使用form发送数据
		//,input set its name as searchWord，
		//建成输入的合法性
		//导入body-parser解析数据,
		var searchWord = req.params.searchWord ;
		User.findOne({'id':req.user},function(err,user){
			if(err){ throw err;}
			if(user){ 
				User.findOneAndUpdate({'id':req.user},{$set:{'searchWord':searchWord}},function(err,user){
					if(err){ throw err;}
				});	
			}	
		});
    };
	this.getLatest = function(req,res,callback){
		var word ;
		User.findOne({'id':req.user},function(err,user){
			if(err){throw err;}
			if(user){
				req.params.searchWord =  user.searchWord;
				callback(req,res);
			}
		});
	};
};