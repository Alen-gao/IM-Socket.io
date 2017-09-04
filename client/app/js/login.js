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

window.addEventListener('keydown', function(event){
  if(event.ctrlKey && event.shiftKey){
    ipcRenderer.send('openDevTools');
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

	var obj = {
		username: $('.J-User').val(),
		password: $('.J-Pass').val()
	}
	$.ajax({
  	url: 'http://io.nodegeek.org/loginuser',
    type: 'POST',
    data: obj,
    success: function(data){
    	if (data.code) {
  			$('.ico').addClass('j-late ');
				$('.radius-l, .radius-r').addClass('rotation');
				$('.show').addClass('j-late j-show').text($('.username').val());
				$('.hide').addClass('j-late j-hide');
				var username = $('.username').val();
				window.localStorage.setItem('uid', data.result.userid);
				ipcRenderer.send('openChat', username);
    		
    	} else {
    		$('.J-UserHint').text('用户名/密码错误！');
    	}
    },
    error: function(err){
      console.log('err', err);
    }
  });

	
}

	
