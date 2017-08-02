var app = require('app');  // Module to control application life.
var Tray = require('tray');
var Menu = require('menu');
var path = require('path');
var powerSaveBlocker = require('power-save-blocker');
const ipcMain = require('electron').ipcMain;
const BrowserWindow = require('electron').BrowserWindow; // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null, chatWindow = null;
var appIcon = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// app.on('closed')
// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  var ico = path.join(__dirname, 'img', 'ico.png');
  mainWindow = new BrowserWindow({
    width: 360
   ,height: 300
   ,transparent: true
   ,frame: false
   ,icon: ico
  });
 
  // mainWindow.setFullScreen(true); 
  
  //set tray icon
  appIcon = new Tray(ico);
  var blocker_id = null;
  var contextMenu = Menu.buildFromTemplate([
    { label: '退出',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
        mainWindow.close();
        mainWindow = null;
      }
    }
  ]);
  appIcon.setToolTip('Web Socket');
  appIcon.setContextMenu(contextMenu);
  


  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/login.html');

  // Emitted when the window is closed.
 
  ipcMain.on('openChat', function(event, arg) {
    var username = arg;
    chatWindow = new BrowserWindow({
        width: 940
       ,height: 520
       ,frame: false
       ,resizable: false
       ,transparent: true
       ,icon: ico
    });
    chatWindow.hide();
    chatWindow.loadUrl('file://' + __dirname + '/admin.html');
    setTimeout(function(){
      mainWindow.close();
      mainWindow = null;
      chatWindow.show();
      chatWindow.webContents.send('post-username', arg);
    },2000);

  });
  ipcMain.on('close-main', function(event, arg) {
    chatWindow.close();
    chatWindow = null;
  });
  ipcMain.on('max-main', function(event, arg) {
    chatWindow.maximize();
  });
  ipcMain.on('min-main', function(event, arg) {
    chatWindow.minimize();
  });
  // ipcMain.on('restore', function(event, arg) {
  //   mainWindow.restore();
  // });
  // app.on('window-all-closed', function () {
  //     app.quit();
  // });
});
