var cache = null;
var search = document.getElementById('search');
var searchWord = document.getElementById('searchWord');
var login = document.querySelector('[href="\login"]');
var result = document.getElementById('result');
var eleArr = [];
var update = function(data){
	result.innerHTML = '';
	if(data.resultcode === 200 && data.data !== '204501'){
		data = data.data.dataList;
		data.forEach(function(ele){
			//name  address phone intro picUrl
			var div = document.createElement('div');
			var name = document.createElement('h2');
			var intro = document.createElement('p');
			var address = document.createElement('p');
			var picUrl = document.createElement('a');
			if(typeof ele.name !== 'undefined'){
				name.innerHTML =ele.name;
			}else{
				name.innerHTML = 'no information about name';
				name.style['color'] = 'gray';
			}
			div.append(name);
			if(typeof ele.intro !== 'undefined'){
				intro.innerHTML = 'Introduce: ' + ele.intro;
			}else{
				intro.innerHTML = 'Introduce:  no information about introduce';
				intro.style['color'] = 'gray';
			}
			div.append(intro);
			if(typeof ele.address !== 'undefined'){
				address.innerHTML = 'Address: ' + ele.address;
			}else{
				address.innerHTML = 'Address:  no information about introduce';
				address.style['color'] = 'gray';
			}
			div.append(address);
			if(typeof ele.picUrl !== 'undefined' && ele.picUrl){
				picUrl.setAttribute('href',ele.picUrl);
				div.append(picUrl);
			}
			result.appendChild(div);
		});	
	}
}
var searchInf = function(pn){
	//if loaded just now ,asign city 'start'
	var words = searchWord.value;
	var pageNum = 0;
	if(arguments.length !== 0){
		pageNum = pn;
	}
	var url = 'http://api.duoyun.io/pdc?partnerId='
	+baseData.partnerId
	+'&token='+baseData.token
	+'&apiId='+baseData.apiId
	+'&rn=15&pn='+pageNum
	+'&fields=name,address,picUrl,intro&cityName='+words;
	searchEngine(words,'get',url,update);
}
search.addEventListener('click',searchInf);