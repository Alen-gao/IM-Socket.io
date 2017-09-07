new Vue({
  el: '#app',
  data: {
    userList: null,
    current: null,
    userid: window.localStorage.getItem('uid')
  },
  created(){
    this.loaduser();
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
      console.log('item', item.userid);
      this.current = item;
      window.localStorage.setItem('current', item.userid);
    }
  }
});
