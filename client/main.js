var app = require('app');  
var ipc = require('ipc');
var Tray = require('tray');
var Menu = require('menu');
var path = require('path');
var powerSaveBlocker = require('power-save-blocker');
var BrowserWindow = require('browser-window');  
// var $ = jQuery = require('jquery'); // as node_modules


// Report crashes to our server.
require('crash-reporter').start();


var loginWindow = null;
var commWindow = null;
var messWindow = null;
var appIcon = null;


app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// app.on('closed')
app.on('ready', function() {
  var ico = path.join(__dirname, 'images', 'Genius.png');
  loginWindow = new BrowserWindow({
    width: 430
   ,height: 330
   ,frame: false
   ,resizable: true
   ,icon: ico
   ,show:false
  });

  
  
  //set tray icon
  appTray = new Tray(ico);
  var blocker_id = null;
  var contextMenu = Menu.buildFromTemplate([
    { label: '退出',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
        loginWindow.close();
        loginWindow = null;
      }
    }
  ]);
  appTray.on("clicked", function(){
    loginWindow.show();
  })
  appTray.setToolTip(app.getName());
  appTray.setContextMenu(contextMenu);
  loginWindow.loadUrl('file://' + __dirname + '/login.html');
  loginWindow.webContents.on( 'did-finish-load', function () {
      loginWindow.show();
  });
  

  // 执行最大化，最小化，关闭窗体操作
  ipc.on('close', function(event, arg) {
    loginWindow.close();
    loginWindow = null;
  });
  ipc.on('minimize', function(event, arg) {
    loginWindow.minimize();
  });
  ipc.on('maximize', function(event, arg) {
    loginWindow.maximize();
  });
  ipc.on('restore', function(event, arg) {
    loginWindow.restore();
  });

  ipc.on('close:comm', function(event, arg) {
    commWindow.close();
    commWindow = null;
    if(messWindow){
      messWindow.close();
      messWindow = null;
    }
  });
  ipc.on('minimize:comm', function(event, arg) {
    commWindow.minimize();
  });

  ipc.on('close:mess', function(event, arg) {
    messWindow.close();
    messWindow = null;
  });
  ipc.on('minimize:mess', function(event, arg) {
    messWindow.minimize();
  });

  ipc.on('open:comm', function(event, arg) {

    loginWindow.close();
    loginWindow = null;

    commWindow = new BrowserWindow({
      width: 300
      ,height: 900
      ,x: 1500
      ,y: 30
      ,min_width: 260
      ,min_height: 600
      ,max_width: 550
      ,max_height: 900
      ,frame: false
      ,icon: ico
    });
    commWindow.loadUrl('file://' + __dirname + '/pages/comm.html');

  });
  //打开聊天窗口
  ipc.on('open:mess', function(event, arg) {
    var name = arg;
    if(messWindow){
        messWindow.setContentSize(880, 510);
        messWindow.setMaximumSize(880, 510);
        messWindow.setMinimumSize(880, 510);
        messWindow.webContents.send('show:left', name);
    }
    else{
      messWindow = new BrowserWindow({
        width: 700
        ,height: 510
        ,min_width: 700
        ,min_height: 510
        ,max_width: 700
        ,max_height: 510
        ,frame: false
        ,icon: ico
      });
      messWindow.loadUrl('file://' + __dirname + '/pages/message.html');
      setTimeout(function(){
        messWindow.webContents.send('transfer:name', name);
      },500);
      
    }
  });  

});

