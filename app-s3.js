const express = require('express');
const path = require('path')
var uuid = require("uuid");
const moment = require("moment")
const bodyParser= require('body-parser')


const app = express();
const multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
const s3 = new aws.S3({
	accessKeyId: '<Access_Key>',
	secretAccessKey: '<Your_Secert_key>',
	Bucket: '<Your_bucket_name>'
});
// console.log(s3)

  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "<Your_Bucket_Name>",
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, "users/"+moment(new Date()).format("YYYY-MM-DD")+"/"+uuid.v4() + path.extname(file.originalname))
      }
    }),
    fileFilter:fileFilter
  });
  
  function fileFilter (req, file, cb){
    var type = file.mimetype;
    var typeArray = type.split("/");   //typeArray[0] == "video" ||
    if ( typeArray[0] == "image") {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname =  filetypes.test((path.extname(file.originalname)).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        console.log(extname,mimetype)
        if(mimetype && extname){
            return cb(null,true);
        } else {
            cb('Error: Images Only! '+file.originalname,true);
        }

    }
    else if(typeArray[0]=="video"){
        const filetypes = /mp4|avi|mov|flv|wmv|3gp/;
        const extname =  filetypes.test((path.extname(file.originalname)).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        console.log(extname,mimetype)
        if(mimetype && extname){
            return cb(null,true);
        } else {
            cb('Error: video Only! '+file.originalname,true);
        }
    }
    else {
      cb(null, false);
    }
  }
app.post('/profile', function (req, res) {
    const profileImageUpload = upload.any();
    try {
        profileImageUpload(req, res, async function (err, some) {
            if(err){
                res.status(400).json({message:err});
            }else{
                res.json({message:"images upload successfully",images:req.files})
            }
        })
    }catch(err){
        console.log(err)
    }
   
    
})
app.get("/", (req, res) => {  
   res.send('hello world');
});
app.listen(3000, () => { 
    console.log('Started on port 3000');
});