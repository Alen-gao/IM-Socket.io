var express = require('express');
var router = express.Router();
var multer = require('multer');
var allRoute = require('../controller/all');

var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './public/images')
  },
  filename: function (req, file, cb){
    var fileFormat = (file.originalname).split(".");
    cb(null,  Date.now() + fileFormat[0] + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({
  storage: storage
});

// router.all('*',function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

//   if (req.method == 'OPTIONS') {
//     res.send(200); /让options请求快速返回/
//   }
//   else {
//     next();
//   }
// });

/* GET home page. */
router.get('/', allRoute.index);
router.get('/saveUser', allRoute.saveUser);
router.get('/userlist', allRoute.userlist);
router.get('/adduser', allRoute.adduser);
router.get('/register', allRoute.register);
router.get('/login', allRoute.login);

/* file upload api */
router.post('/signin', allRoute.signin);
router.post('/savesign', allRoute.saveSign);

router.post('/saveUser', allRoute.saveUser);
router.post('/delUser', allRoute.delUser);
router.post('/loginuser', allRoute.loginUser);
router.post('/loaduser', allRoute.loadUser);
router.post('/updataUser', allRoute.updataUser);
router.post('/upload', upload.single('file'), allRoute.upload);

router.all('*', allRoute.error);
module.exports = router;