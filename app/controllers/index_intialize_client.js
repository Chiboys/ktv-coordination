//初始函数，
/*
	向服务器发送'/search/json/start'，start作为判断是不是出事函数
		  使用index_client.js中的update函数。将index_client.js 导入在前
          不使用（）函数，传入update函数，验证一下，能否使用
	

*/
(function(){
	//search.setAttribute('onclick','searchInf()');//初始化搜索按钮
	var url = '/search/json/start';
	ajaxFunctions.read(ajaxFunctions.ajaxRequest('get',url,update));

})();