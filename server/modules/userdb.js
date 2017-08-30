var mongoose = require('./db');

var UserSchema = new mongoose.Schema({
  userid:{type: Number},
  username: {type: String},
  password: {type: String},
  nickname: {type: String},
  light: {type: String},
  unread: {type: String},
  img: {type: String},
  endmeaage:{type: String},
  group: {type: String},
  author: {type: String},
  autograph: {type: String},
	time: {type: String}
},{safe:true});

var UserModel = mongoose.model('socket', UserSchema);

module.exports = {
	model: UserModel,
  save: function(obj, callback) {
    var date = new Date();
    var time = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate()
        + " " + date.getHours() +':'+ date.getMinutes()
        +':'+ date.getSeconds();
    var SaveUser = new UserModel({
      userid: obj.userid || new Date().getTime(),
      username: obj.username || '',
      password: obj.password || '',
      nickname: obj.nickname || '',
      light: obj.light || '',
      unread: obj.unread || '',
      img: obj.img || '',
      endmeaage: obj.endmeaage || '',
      group: obj.group || 'admin',
      author: obj.author || '',
      autograph: obj.autograph || '',
      time: time
    });
    SaveUser.save(function(err,date){
      callback && callback(err, date);
    });
  },
  thereIs: function(obj, callback) {
    UserModel.find(obj, function(err, date){
      callback && callback(err, date.length);
    });
  },
  load: function(obj, callback){
    UserModel.find(obj, function(err, date){
      callback && callback(err, date);
    });
  },
  upDate: function(star, end, callback) {
    UserModel.update(star, end, function(err,date){
      callback && callback(err, date);
    });
  },
  del: function(obj, callback) {
    UserModel.remove(obj, function(err,date){
      callback && callback(err, date);
    });
  }
};