/**
 * Created by Allen-gao on 2017/3/19.
 */
var mongoose = require('mongoose');
// 引入 mongoose 模块
mongoose.connect('mongodb://localhost:27017');
// 然后连接对应的数据库：mongodb://localhost/blog
// 其中，前面那个 mongodb 是 protocol scheme 的名称；localhost 是 mongod 所在的地址；
// 端口号省略则默认连接 27017；test 是数据库的名称
//// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function(callback) {
    console.log("MongoDB Opened!");
});

module.exports = mongoose;
// 导出 mongoose 模块