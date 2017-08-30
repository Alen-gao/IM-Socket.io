var mongoose = require('./db');

var UserSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  img: {type: String},
  nickname: {type: String},
  time: {type: String}
},{safe:true});

var UserModel = mongoose.model('login', UserSchema);

module.exports = {
  model: UserModel,
  save: function(obj, callback) {
    var date = new Date();
    var time = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate()
        + " " + date.getHours() +':'+ date.getMinutes()
        +':'+ date.getSeconds();
    var SaveUser = new UserModel({
      username: obj.username || '',
      password: obj.password || '',
      img: obj.img || '',
      nickname: obj.nickname || '',
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