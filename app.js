const express = require('express');
const path = require('path')
var uuid = require("uuid");

const app = express();
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
 });
 var upload = multer({ storage: storage ,fileFilter:fileFilter});
 function fileFilter (req, file, cb){
    var type = file.mimetype;
    var typeArray = type.split("/");   //typeArray[0] == "video" ||
    if ( typeArray[0] == "image") {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname =  filetypes.test(((file.originalname).split('.')[1]).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        console.log(extname,mimetype)
        if(mimetype && extname){
            return cb(null,true);
        } else {
            cb('Error: Images Only! '+file.originalname,true);
        }

    }else {
      cb(null, false);
    }
  }
// const upload = multer({dest:'uploads/'}).single("demo_image");
app.post('/profile', function (req, res) {
    try {
        const uploadImage=upload.array('avatar',4);
        uploadImage(req, res, async (err, some) => {
            if(err){
                res.status(400).json({message:err});
            }else{
                res.json({message:"images upload successfully",images:req.file})
            }
        })
    } catch (error) {
        throw new Error(error,333)
    }
    
  })
app.get("/", (req, res) => {  
   res.send('hello world');
});
app.listen(3000, () => { 
    console.log('Started on port 3000');
});