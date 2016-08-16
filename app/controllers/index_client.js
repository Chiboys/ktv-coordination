var cache = null;
var search = document.getElementById('search');
var searchWord = document.getElementById('searchWord');
var login = document.querySelector('#login');
var result = document.getElementById('result');
var eleArr = [];
var update = function(data){
	result.innerHTML = '';
	data = JSON.parse(data);
	if(data.value){
		data = data.value;
		data.forEach(function(ele){
			//name  address phone intro picUrl
			var div = document.createElement('div');
			var name = document.createElement('h2');
			var thumbnailUrl = document.createElement('img');
			var contentUrl = document.createElement('p');
			var pageUrl = document.createElement('p');
			if(typeof ele.name !== 'undefined' && ele.name){
					name.innerHTML = ele.name;				
			}else{
				name.innerHTML = 'no information about name';
				name.style['color'] = 'gray';
			}
			div.appendChild(name);
			if(typeof ele.thumbnailUrl !== 'undefined' && ele.thumbnailUrl){
					thumbnailUrl.setAttribute('src',ele.thumbnailUrl);	
					thumbnailUrl.style.width = '300px';
					thumbnailUrl.style.height = '200px';
			}
			div.appendChild(thumbnailUrl);
			if(typeof ele.contentUrl !== 'undefined' && ele.contentUrl){
				contentUrl.innerHTML = 'content: <a href='+ele.contentUrl+'> ' + ele.contentUrl+'</a>';
			}else{
				contentUrl.innerHTML = 'content:  no information about introduce';
				contentUrl.style['color'] = 'gray';
			}
			div.appendChild(contentUrl);
			if(typeof ele.pageUrl !== 'undefined' && ele.pageUrl){
				pageUrl.innerHTML = 'Page: <a href='+ele.pageUrl+'> ' + ele.pageUrl+'</a>';
			}else{
				pageUrl.innerHTML = 'Page:  no information about pageUrl';
				pageUrl.style['color'] = 'gray';
			}
			div.appendChild(pageUrl);
			result.appendChild(div);
		});	
	}else{//нч╫А╧Ш
		var infor = document.createElement('p');
		infor.innerHTML = data.message;
		result.appendChild(infor);
	}
}
var searchInf = function(pn){
	//if loaded just now ,asign city 'start'
	var words = searchWord.value;
	var pageNum = 0;
	if(arguments.length !== 0){
		pageNum = pn;
	}
	var url = '/search';
	ajaxFunctions.searchEngine(words,'get',url,update);
}
searchWord.addEventListener('blur',function(){
		var words = searchWord.value;
		words = words.replace(/\w+/g,'');
		if(words){
			search.setAttribute('disabled','disabled');
			search.classList.add('has-error');
			search.classList.remove('has-success')
		}else{
			search.removeAttribute('disabled');
			search.classList.add('has-success');
			search.classList.remove('has-error');
		}
	});
search.addEventListener('click',searchInf);
