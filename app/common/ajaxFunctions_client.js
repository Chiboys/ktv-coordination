ajaxFunctions = function(){
	this.ready = function(fn){
		if(typeof fn !== 'function'){
			return;
		}
		if(document.readyState === 'complete'){
			fn();
		}
		document.addEventListener('DOMContentLoaded',fn,false);
	};
	this.ajaxRequest=function(method,url,callback){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readState === 4 && xmlhttp.status === 200){
				callback(xmlhttp.response);
			}
		}
		xmlhttp.open(method,url,true);
		xmlhttp.send();
	};
}