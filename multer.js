const express = require('express')
const app = express()
const port = 3000
const multer  = require('multer')
var fs        = require('fs'); // 1

app.set('view engine', 'ejs');

var storage  = multer.diskStorage({ // 2
  destination(req, file, cb) {
    cb(null, 'uploadedFiles/');
  },
  filename(req, file, cb) {
    cb(null,  `${Date.now()}__${file.originalname}`);
  },
});

// var upload = multer({ dest: 'uploadedFiles/' })
var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2


app.get('/', (req, res) => {
  res.render('upload');
})

app.post('/upload', uploadWithOriginalFilename.single('attachment'), function(req,res){ // 5
  res.render('confirmation', { file:req.file, files:null });
});

app.listen(port, function(){
  var dir = './uploadedFiles';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir); // 2

  console.log('server on! http://localhost:'+port);
});