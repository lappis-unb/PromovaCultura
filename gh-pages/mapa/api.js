// var script = document.createElement('script');
// script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);
jQuery = require('jquery')

jQuery.get('http://api.salic.cultura.gov.br/v1/projetos/?limit=20', function(data) {
	console.log(data)        
})