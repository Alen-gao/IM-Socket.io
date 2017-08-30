var mongoose = require('./db');

var MessSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  img: {type: String},
  group: {type: String},
  author: {type: String},
	time: {type: String}
},{safe:true});

var MessModel = mongoose.model('message', MessSchema);

module.exports = {
	model: MessModel,
  save: function(obj, callback) {
    var date = new Date();
    var time = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate()
        + " " + date.getHours() +':'+ date.getMinutes()
        +':'+ date.getSeconds();
    var SaveMess = new MessModel({
      username: obj.name || '',
      password: obj.password || '',
      group: obj.group || 'admin',
      author: obj.author || '',
      img: obj.img || '',
      time: time
    });
    SaveMess.save(function(err,date){
      callback && callback(err, date);
    });
  },
  thereIs: function(obj, callback) {
    MessModel.find(obj, function(err, date){
      callback && callback(err, date.length);
    });
  },
  load: function(obj, callback){
    MessModel.find(obj, function(err, date){
      callback && callback(err, date);
    });
  },
  upDate: function(star, end, callback) {
    MessModel.update(star, end, function(err,date){
      callback && callback(err, date);
    });
  },
  del: function(obj, callback) {
    MessModel.remove(obj, function(err,date){
      callback && callback(err, date);
    });
  }
};