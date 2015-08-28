var ipc = require('ipc');
var arr = [];
$(document).on('click', '#close', function(){	
	ipc.sendSync('close:mess');
});
$(document).on('click', '#min', function(){
	ipc.sendSync('minimize:mess');
});

ipc.on('show:left', function(arg) {
	if(arr.indexOf(arg)==-1){
		var html = '<li><img src="../images/logo.png"><span class="nickname">'+arg+'</span></li>';
		$(".cont-right").find('.name').text(arg);
		$(html).insertBefore($('.left').find('li').eq(0));
		$('.left').show();
		$('.top').css({'padding-left': '180px'});
		$('.footer').css({'padding-left': '180px'});
		$('.right').css({'padding-left': '180px'});
		arr.push(arg);
	}
});
ipc.on('transfer:name', function(arg) {
	arr.push(arg);
	var html = '<li><img src="../images/logo.png"><span class="nickname">'+arg+'</span></li>';
	$(".top").find('.name').text(arg);
	$(".cont-right").find('.name').text(arg);
	$('.left').find('ul').append(html);
});

$(document).on('dblclick', '.left li', function(){
	var name = $(this).find('.nickname').text();
	$('.top').find('.name').text(name);
});


(function () {
	var d = document,
	w = window,
	p = parseInt,
	dd = d.documentElement,
	db = d.body,
	dc = d.compatMode == 'CSS1Compat',
	dx = dc ? dd: db,
	ec = encodeURIComponent;
	
	
	w.CHAT = {
		msgObj:d.getElementById("message"),
		// userList: d.getElementById("userList"),
		screenheight:w.innerHeight ? w.innerHeight : dx.clientHeight,
		username:null,
		userid:null,
		socket:null,
		//让浏览器滚动条保持在最低部
		scrollToBottom:function(){
			w.scrollTo(0, this.msgObj.clientHeight);
		},
		//退出，本例只是一个简单的刷新
		logout:function(){
			//this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit:function(){
			var content = d.getElementById("content").value;
			if(content != ''){
				var obj = {
					userid: this.userid,
					username: this.username,
					content: content
				};
				this.socket.emit('message', obj);
				d.getElementById("content").value = '';
			}
			return false;
		},
		genUid:function(){
			return new Date().getTime()+""+Math.floor(Math.random()*899+100);
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg:function(o, action){
			//当前在线用户列表
			var onlineUsers = o.onlineUsers;
			//当前在线人数
			var onlineCount = o.onlineCount;
			//新加入用户的信息
			var user = o.user;
			
		},
		init:function(username){
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			
			//连接websocket后端服务器
			this.socket = io.connect('http://127.0.0.1:3000');
			
			//监听消息发送 <span>'+obj.username+'</span> <div></div>
			this.socket.on('message', function(obj){
				var isme = (obj.userid == CHAT.userid) ? true : false;
				if(isme){
					var html = '<div class="mess-right"><img src="../images/logo.png"><div class="mess-cont">'+
                               '<div>'+obj.content+'</div></div></div>';
				} else {
					var html = '<div class="mess-left"><img src="../images/logo.png"><div class="mess-cont">'+
                               '<div>'+obj.content+'</div></div></div>';
				}
				$('.message').append(html);
				// CHAT.scrollToBottom();
			});

		}
	};
	
	//通过“回车”提交信息
	d.getElementById("content").onkeydown = function(e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.submit();
		}
	};

	CHAT.init();

})(Zepto);