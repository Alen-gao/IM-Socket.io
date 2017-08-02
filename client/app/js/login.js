const ipcRenderer = require('electron').ipcRenderer;

$(window).on('keydown', function(event){
	if((event.ctrlKey) && event.shiftKey && event.keyCode==73){
      	ipcRenderer.sendSync('showDevTools');
  	}
});

document.onkeyup = function(event){
	var code = event.keyCode;
	if ( event.ctrlKey && event.shiftKey && code==69 ) {
		ipc.sendSync('openDevTools');
	}
}

//点击登录时
$(document).on('click', '#submit', function(){
	if ($('.username').val() && $('.password').val()) {
		login();
	}
});
//相应Enter建
$(window).on('keydown', function(event){
	if (event.keyCode==13 && $('.username').val() && $('.password').val()) {
		login();
	}
});
//接收登录
function login(){
	$('.ico').addClass('j-late ');
	$('.radius-l, .radius-r').addClass('rotation');
	$('.show').addClass('j-late j-show').text($('.username').val());
	$('.hide').addClass('j-late j-hide');

	var username = $('.username').val();
	// window.localStorage.setItem("username", username);
	ipcRenderer.send('openChat', username);
}

	
