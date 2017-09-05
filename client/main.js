/**
 * electron main process
 * webSocket 
 * author by Alen-gao
 * time is 2017/01/21 00:44
*/

// Introduce dependency
const electron = require('electron');
const app = electron.app;
const path = require('path');
// const {app, Menu, Tray} = require('electron')
// const remote = electron.remote;
const Tray = electron.Tray;
const Menu = electron.Menu;
// const Menu = require('menu');

const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;


// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
let tray = null;
let mainWindow = null;
let chatWindow = null;
// ipc.on('openDevTools');

app.on('ready', function() {
  
  // IM icon 
  var ico = path.join(__dirname, 'app/img', 'ico.png');
  mainWindow = new BrowserWindow({
    width: 360
    ,height: 300
    ,transparent: true
    ,frame: false
    ,icon: ico
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/app/login.html');
  // IM menu

  // mainWindow.openDevTools();
  


  tray = new Tray(ico);
  const contextMenu = Menu.buildFromTemplate([
    { label: '用户设置',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
        
      }
    }, { label: '意见反馈',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
        
      }
    }, { label: '帮助中心',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
       
      }
    },
    { label: '关于IM',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
        
      }
    }, { label: '退出IM',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
        if (mainWindow) {
          mainWindow.close();
          mainWindow = null;
        }
        if (chatWindow) {
          chatWindow.close();
          chatWindow = null;
        }
        
      }
    }
  ])
  tray.setToolTip('This is my IM')
  tray.setContextMenu(contextMenu)



  // Emitted when the window is closed.
  ipcMain.on('openChat', (event, arg)=> {
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
    chatWindow.loadURL('file://' + __dirname + '/app/admin.html');
    setTimeout(function(){
      mainWindow.close();
      mainWindow = null;
      chatWindow.show();
      chatWindow.webContents.send('post-username', arg);
      // chatWindow.openDevTools();
    },2000);

  });

  // shwo console
  ipcMain.on('openDevTools', ()=> {
    if (mainWindow) {
      mainWindow.openDevTools();
    }
    if (chatWindow) {
      chatWindow.openDevTools();
    }
  });

  ipcMain.on('close-login', (event, arg)=> {
    mainWindow.close();
    mainWindow = null;
  });

  ipcMain.on('close-main', (event, arg)=> {
    chatWindow.close();
    chatWindow = null;
  });

  ipcMain.on('max-main', (event, arg)=> {
    chatWindow.maximize();
  });

  ipcMain.on('min-main', (event, arg)=> {
    chatWindow.minimize();
  });

});