var ipc = require('ipc');

$(document).on('click', '#close', function(){	
	ipc.sendSync('close');
});
$(document).on('click', '#min', function(){
	ipc.sendSync('minimize');
});

$(document).on('click', '.btn-primary', function(){
	var user = $('.user').val();
	// var pass = $('.pwdInput').val();
	window.localStorage.setItem('userName', user);
	ipc.send('open:comm', function(data) {
	    console.log(data);
	});
});
