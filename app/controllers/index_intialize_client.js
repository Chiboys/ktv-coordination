//��ʼ������
/*
	�����������'/search/json/start'��start��Ϊ�ж��ǲ��ǳ��º���
		  ʹ��index_client.js�е�update��������index_client.js ������ǰ
          ��ʹ�ã�������������update��������֤һ�£��ܷ�ʹ��
	

*/
(function(){
	//search.setAttribute('onclick','searchInf()');//��ʼ��������ť
	var url = '/search/json/start';
	ajaxFunctions.read(ajaxFunctions.ajaxRequest('get',url,update));

})();