'user strict'; 
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
module.exports = function(){
		this.ajaxRequest = function(method,url,callback){
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
					callback(xmlhttp.response);
				}
				xmlhttp.open(method,url,true);
				xmlhttp.send();
			}
		}	
	}