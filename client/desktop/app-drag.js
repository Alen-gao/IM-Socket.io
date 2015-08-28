'use strict'

var $ = require('jquery')
var remote = require('remote')
var curwin = remote.getCurrentWindow()

var isDragging = false
var winPos
var dX, dY // screen - win

$(document).on('mousedown', '.app-drag', function(e) {
  e = e.originalEvent || e
  var $el = $(e.target)
  var canDrag = $el.closest('.app-no-drag').length <= 0
  if (canDrag) {
    isDragging = true
    winPos = curwin.getPosition()
    dX = e.screenX - winPos[0]
    dY = e.screenY - winPos[1]
  }
})

$(document).on('mousemove', function(e) {
  if (!isDragging) return
  e = e.originalEvent || e
  var _x = e.screenX - dX
  var _y = e.screenY - dY
  curwin.setPosition(_x, _y)
})

$(document).on('mouseup mouse', function(e) {
  isDragging = false
})
