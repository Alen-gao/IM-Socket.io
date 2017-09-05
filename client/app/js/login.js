const ipcRenderer = require('electron').ipcRenderer;

new Vue({
  el: '#login',
  data: {
    username: null,
    password: null,
		signin: false,
    loginhint: ''
  },
  created(){
    this.openDevTools();
  },
  methods: {
  	openDevTools(){
  		let _this = this;
  		window.addEventListener('keydown', function(event){
			  if(event.ctrlKey && event.shiftKey){
			    ipcRenderer.send('openDevTools');
			  }
			  if (event.keyCode==13 && _this.username && _this.password) {
					_this.UserLogin();
				}
			});
  	},
  	closeLogin(){
  		ipcRenderer.send('close-login');
  	},
    UserLogin(){
    	let obj = {
    		username: this.username,
    		password: this.password
    	}
      this.$http.post('http://io.nodegeek.org/loginuser',obj,{emulateJSON:true}).then(function(res){
        this.userList = res.body.result;
        if (res.body.code) {
        	this.signin = true;
					window.localStorage.setItem('uid', res.body.result.userid);
					ipcRenderer.send('openChat', this.username);
        } else {
        	this.loginhint = '用户名/密码错误！';
        }
      },function(res){
        console.log(res.status);
      });
    }
  }

});