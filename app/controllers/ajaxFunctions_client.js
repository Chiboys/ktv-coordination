//function:
	//enter:search words
	//return : search result 对象 ; 基本元素有
var ajaxFunctions = {
		searchEngine : function(words,method,url,callback){
				//基本处理：保证有参数传入，去除前后空格，防止空字符串
				if(arguments.length < 4 || !words.trim()){
					return {value:null,message:'params is illegal'};
				}
				url = url+'/'+words.trim();
				console.log('search url:'+url);
				//专门进行数据获取
				search(method,url,callback);
			
				function search(method,url,callback){
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange = function(){
							if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
								callback(xmlhttp.response);
								if(words === 'start'){
									var login = document.querySelector('#login');
									login.setAttribute('hidden','hidden');
								}
							}
							if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
								console.log('xmlhttp request failed with code '+xmlhttp.status);
							}
						}
						xmlhttp.open(method,url,true);
						xmlhttp.send();
					}
			},
		ready : function(fn){
			if(typeof fn !== 'function'){
				return;
			}
			if(document.readyState === 'complete'){
				return fn();
			}
			document.addEventListener('DOMContentLoaded',fn,false);		
		}
};
