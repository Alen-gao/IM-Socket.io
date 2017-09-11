new Vue({
  el: '#chat',
  data: {
    userList: null,
    current: null,
    group: false,
    isgroup: true,
    userid: window.localStorage.getItem('uid')
  },
  created(){
    this.loaduser();
  },
  filters: {
    filterImg:(img)=>{
      return img.replace('/images', 'img');
    }
  },
  methods: {
    closeWin(){
      ipcRenderer.send('close-main');
    },
    closeMin(){
      ipcRenderer.send('min-main');
    },
    closeMax(){
      ipcRenderer.send('max-main');
    },
    showChat(){
      this.group = false;
    },
    showGroup(){
      this.group = true;
    },
    isGroup(){
      this.isgroup = true;
    },
    isMuc(){
      this.isgroup = false;
    },
    delUser(item){
      var index = this.userList.indexOf(item);
      this.userList.splice(index, 1);
    },
    loaduser(){
      this.$http.post(config.server+'loaduser',{},{emulateJSON:true}).then(function(res){
        this.userList = res.body.result;
      },function(res){
        console.log(res.status);
      });
    },
    toggleSession(item){
      this.current = item;
      window.localStorage.setItem('current', item.userid);
    },
    handleFileChange(){
      let inputDOM = document.querySelector('.add-file');
      this.file = inputDOM.files[0];
      console.log('this.file', this.file);
      let formData = new FormData();
      formData.append('file',inputDOM.files[0]);
      // this.errText = '';
      // let size = Math.floor(this.file.size / 1024);
      this.$http.post(config.server+'upload',formData,{emulateJSON:true}).then(function(res){
        console.log('res.body.url', res.body.url);
        let html = '<img src="'+res.body.url+'" /><div></div>';
        document.getElementById("textarea").innerHTML+=html;  
      },function(res){
        console.log(res.status);
      });
    }
  }
});
