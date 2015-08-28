var BrowserWindow = require('browser-window')

exports.template = __dirname + '/notification.html'
exports.notify = notify


function notify(data, callback){
  var screen = require('screen')
  var size = screen.getPrimaryDisplay().workAreaSize
  var newwin = new BrowserWindow({
    width: 300,
    height: 100,
    x: size.width - 300,
    y: size.height - 100,
    'always-on-top': true,
    'skip-taskbar': true,
    frame: false,
    show: false
  })
  newwin.loadUrl('file://' + exports.template)
  newwin.webContents.on('did-finish-load', function(){
    newwin.webContents.send('notification-data', data)
  })
}
