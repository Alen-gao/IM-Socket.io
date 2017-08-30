
// var menuDriven = require('./menuApi');
var userDb = require('../modules/userdb'),
    adminDb = require('../modules/admindb'),
    messageDb = require('../modules/message');

module.exports = {
    // 广告接口
    index: function(req, res, next){
      res.render('login', { title: '用户登录', layout: false });
    },
    register: function(req, res, next){
        res.render('register', { title: 'Express',layout: false });
    },
    login: function(req, res, next){
        res.render('login', { title: '用户登录', layout: false });
    },
    adduser: function(req, res, next){
        if (req.session.username) {
            res.render('personal/adduser', { title: 'Express', crumbs: '添加用户', href: '/userlist', current: 'adduser', crumbsTitle:' 返回列表'});
        } else {
          res.render('login', { title: '用户登录', layout: false });
        }
    },
    userlist: function(req, res, next){
        if (req.session.username) {
            res.render('personal/userlist', { title: 'Express', crumbs: '用户列表', href: '/adduser', current: 'userlist', crumbsTitle:' + 添加分类'});
        } else {
          res.render('login', { title: '用户登录', layout: false });
        }
    },
    saveSign: function(req, res, next){
        var param  = req.method == "POST" ? req.body : (req.query || req.params);
        console.log('param', param);
        adminDb.save(param, function(err, data){
            if (err) {
                res.send({code:0, data:{result: err, message: '添加失败！'} });
            } else {
                res.send({code:1, data:{result:  data.name, message: '添加成功！'} });
            }
        });
    },
    signin: function(req, res, next){
        var param  = req.method == "POST" ? req.body : (req.query || req.params);
        adminDb.load(param, function(err, data){
            if (err) {
                res.send({code:0, data:{result: err, message: '登录失败！'} });
            } else {
                if (data) {
                    req.session.username = data[0].username;
                    console.log('req.session.username', req.session.username);
                    res.send({code:1, signin:true, data:{result:data[0].username, message: '登录成功！'} });
                } else {
                    res.send({code:1, signin:false, data:{result:'', message: '用户名或者密码错误！'} });
                }
            }
        });
    },
    saveUser: function(req, res, next){
        var param  = req.method == "POST" ? req.body : (req.query || req.params);
        param.userid = new Date().getTime();
        if (req.session.username) {
            userDb.thereIs({username:param.username}, function(err, user){
                if (!user) {
                    userDb.save(param, function(err, user){
                        res.send({code:1, message: '用户注册成功!', user:user});
                    });
                }
                else{
                  res.send({code:0, message: '用户已经存在，清重新输入用户名!'});
                  return;
                }
            });
        } else {
            res.send({code:0, message: '用户未登录,请登录以后操作!'});
        }
        
    },
    loadUser: function(req, res, next){
        var param  = req.method == "POST" ? req.body : (req.query || req.params);
        if (req.session.username) {
            userDb.load(param, function(err, data){
                if (err) {
                    res.send({code:0, result:err, message: '加载失败！' });
                } else {
                    res.send({code:1, result:data, message: '加载成功！' });
                }
            });
        } else {
            res.send({code:0, message: '加载成功！', result:data });
        }
    },
    updataUser: function(req, res, next){
        var param  = req.method == "POST" ? req.body : (req.query || req.params);
        if (req.session.username) {
            var star = {
                userid: param.userid
            }
            var end = {
                username : param.username || '',
                password : param.password || '',
                nickname: param.nickname || '',
                light: param.light || '',
                unread: param.unread || '',
                img: param.img || '',
                endmeaage: param.endmeaage || ''
            };
            userDb.upDate(star, end, function(err, data){
                if (err) {
                    res.send({code:0, result: err, message: '修改失败！' });
                } else {
                    res.send({code:1, result: data.name, message: '修改成功！'})
                }
            });
        } else {
            res.send({code:0, data:{result: null, message: '用户未登录！'} });
        }
    },
    delUser: function(req, res, next){
        var param  = req.method == "POST" ? req.body : (req.query || req.params);
        if (req.session.username) {
           userDb.del(param, function(err, data){
             if (err) {
                    res.send({code:0, result: err, message: '删除失败！' });
                } else {
                    res.send({code:1, result: null, message: '删除成功！'})
                }
           });
        } else {
            res.send({code:0, data:{result: null, message: '用户未登录！'} });
        }
    },
    upload: function(req, res, next){
        var url = 'http://' + req.headers.host + '/images/' + req.file.filename;
        res.send({code:1, url: url,  message: "上传成功！"});
    },
    error: function(req, res, next){
        res.render('error', { title: '用户登录', layout: false });
    },
}