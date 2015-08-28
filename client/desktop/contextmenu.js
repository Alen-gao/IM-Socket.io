'use strict'

var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = remote.require('menu-item')
var $ = require('jquery')

var cut = new MenuItem({
  label: '剪切',
  click: function () {
    document.execCommand('cut')
  }
})
var copy = new MenuItem({
  label: '复制',
  click: function () {
    document.execCommand('copy')
  }
})
var paste = new MenuItem({
  label: '粘贴',
  click: function () {
    document.execCommand('paste')
  }
})

var textMenu = new Menu()
textMenu.append(cut)
textMenu.append(copy)
textMenu.append(paste)

var pwdMenu = new Menu()
pwdMenu.append(paste)

$(document).on('contextmenu', function(e) {
  var $el = $(e.target)
  var isText = $el.closest([
    'input[type=text]',
    'input[type=email]',
    'input[type=number]',
    'input[type=date]',
    'textarea',
    '[contenteditable]'
  ].join(', ')).length >= 1
  if (isText) {
    e.preventDefault()
    textMenu.popup(remote.getCurrentWindow())
    return
  }
  var isPwd = $el.closest('input[type=password]').length >= 1
  if (isPwd) {
    e.preventDefault()
    pwdMenu.popup(remote.getCurrentWindow())
    return
  }
})
