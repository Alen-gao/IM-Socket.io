const ipcRenderer = require('electron').ipcRenderer;
// var win = gui.Window.get();
var uid = window.localStorage.getItem('uid')+'';
var current = window.localStorage.getItem('current')+'';
console.log('current', current);
window.addEventListener('keydown', function(event){
  if(event.ctrlKey && event.shiftKey){
    ipcRenderer.send('openDevTools');
  }
});
var converId = null;
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
		userList: d.getElementById("userList"),
		screenheight:w.innerHeight ? w.innerHeight : dx.clientHeight,
		username:null,
		userid:null,
		socket:null,
		//让浏览器滚动条保持在最低部
		scrollToBottom:function(){
			setTimeout(function(){
				d.getElementById("message").scrollTop = 1000000000;
			},120);
		},
		//退出，本例只是一个简单的刷新
		logout:function(){
			//this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit:function(){
			var content = d.getElementById("textarea").innerText;
					current = window.localStorage.getItem('current')+'';
			if(content != ''){
				var obj = {
					userid: this.userid,
					username: this.username,
					content: content
				};
				this.socket.emit('send', uid, current ,obj);
				var section = d.createElement('div');
				var contentDiv = '<span class="user-img"><img src="img/04.gif"></span><p class="mess-cont">'+content+'</p>';
				section.className = 'mess-right';
				section.innerHTML = contentDiv;
				CHAT.msgObj.appendChild(section);
				// console.log('obj', obj, contentDiv);
				this.socket.emit('broadcast', obj);
				d.getElementById("textarea").innerHTML = '';
				this.scrollToBottom();
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
				
			//更新在线人数
			var userhtml = '';
			var separator = '';
			for(key in onlineUsers) {
		        if(onlineUsers.hasOwnProperty(key)){
					userhtml += separator+onlineUsers[key];
					separator = '、';
				}
		    }
			// d.getElementById("onlinecount").innerHTML = '当前共有 '+onlineCount+' 人在线，在线列表：'+userhtml;
			
			//添加系统消息
			var html = '';
			html += '<span>';
			html += user.username;
			html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
			html += '</span>';
			var section = d.createElement('p');
			section.className = 'prompt';
			section.innerHTML = html;
			this.msgObj.appendChild(section);
			this.scrollToBottom();
		},
		//第一个界面用户提交用户名
		usernameSubmit:function(username){
			if(username != ""){
				d.getElementById("username").value = '';
				// d.getElementById("loginbox").style.display = 'none';
				// d.getElementById("chatbox").style.display = 'block';
				this.init(username);
			}
			return false;
		},
		init:function(username){
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = uid;
			this.username = username;
			
			//连接websocket后端服务器
			// this.socket = io.connect('http://socket.nodegeek.org/');
			this.socket = io.connect('http://io.nodegeek.org/');
			
			
			//告诉服务器端有用户登录
			this.socket.emit('login', {userid:this.userid, username:this.username});
			
			//监听新用户登录
			this.socket.on('login', function(o){
				CHAT.updateSysMsg(o, 'login');	
			});
			
			//监听用户退出
			this.socket.on('logout', function(o){
				CHAT.updateSysMsg(o, 'logout');
			});
			console.log('接受消息', 'collect'+uid);
			this.socket.on('collect'+uid, function (data) {
				console.log('data', data, uid);
	      var section = d.createElement('div');
				var contentDiv = '<span class="user-img"><img src="img/03.gif"></span><p class="mess-cont">'+data.message+'</p>';
				section.className = 'mess-left';
				section.innerHTML = contentDiv;
				CHAT.msgObj.appendChild(section);
				CHAT.scrollToBottom();
      });
			
			//监听消息发送 <span>'+obj.username+'</span> <div></div>
			// this.socket.on('broadcast', function(obj){
			// 	console.log('obj222', obj);
			// 	var isme = (obj.userid == CHAT.userid) ? true : false;
			// 	// var usernameDiv = '<div  class="mess-cont"><p>'+obj.username+'</p><div>'+obj.content+'</div></div>';
				
			// 	var section = d.createElement('div');
			// 	if(isme){
			// 		var contentDiv = '<span class="user-img"><img src="img/03.gif"></span><p class="mess-cont">'+obj.content+'</p>';
			// 		section.className = 'mess-right';
			// 		section.innerHTML = contentDiv;
			// 	} else {
			// 		var contentDiv = '<span class="user-img"><img src="img/04.gif"></span><p class="mess-cont">'+obj.content+'</p>';
			// 		section.className = 'mess-left';
			// 		section.innerHTML = contentDiv;
			// 	}
			// 	CHAT.msgObj.appendChild(section);
			// 	CHAT.scrollToBottom();	
			// });

		}
	};
	
	//通过“回车”提交用户名
	ipcRenderer.on('post-username',  function(event, message) {
		CHAT.usernameSubmit(message);
	});
	var username = window.localStorage.getItem("username");
	d.getElementById("username").onkeydown = function(e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.usernameSubmit(this.value);
		}
	};
	//通过“回车”提交信息
	d.getElementById("textarea").onkeydown = function(e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.submit();
		}
	};

})();