const ipcRenderer = require('electron').ipcRenderer;
const shell = require('electron').shell;
const links = document.querySelectorAll('a[href]')

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
    this.shellA();
  },
  methods: {
  	shellA(){
  		Array.prototype.forEach.call(links, function (link) {
			  const url = link.getAttribute('href')
			  if (url.indexOf('http') === 0) {
			    link.addEventListener('click', function (e) {
			      e.preventDefault()
			      shell.openExternal(url)
			    })
			  }
			})
  	},
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
      this.$http.post(config.server+'loginuser',obj,{emulateJSON:true}).then(function(res){
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