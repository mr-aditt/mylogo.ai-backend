var express = require('express');
const passport = require('passport');
var router = express.Router();
var { User, Logo } = require('../schema/schema')
var mongoose = require('mongoose')
var { hashPwd, comparePwd } = require('../schema/bcrypt')
const multer = require('multer');
const path = require('path');

let file_name; 

var newFileName = ()=>{file_name = Date.now();}

// Upload logos from user

var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, __dirname+'/../public');
    },
    filename: (req, file, cb)=>{
      newFileName()
      cb(null, file_name+path.extname(file.originalname))
    }
  })
});

router.get('/deployed', (req, res)=>{
  res.send('HELLO')
})

router.post('/upload', upload.single('file'), async function (req, res, next) {
  const file = req.file
  console.log(req.file);
  var x =  new Logo()
  x.image=file_name+path.extname(file.originalname)
  x.save((err, doc)=>{
    if(!err){
      console.log(req.file.originalname+" Saved successfully as "+file_name+path.extname(file.originalname));
    }else{
      console.log(err);
    }
  })
  res.status(200).send("Uploaded")
});


router.post('/signup', async function (req, res) {
  console.log(req.body.useremail, req.body.password);
  try {
    const user = await User.findOne({ useremail: req.body.useremail })
    console.log("REGISTERATION USER", user);
    if (user) {
      res.status(200).send({
        "status": false,
        "message": 'User already exists'
      });
    } else {
      console.log("CREATING USER", req.body);
      const encodedPwd = await hashPwd(req.body.password)
      req.body.password = encodedPwd
      const record = await User.create(req.body);
      res.status(200).send({
        "status": true,
        "message": 'User created successfully'
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/signin', async function (req, res) {
  try {
    const user = await User.findOne({ useremail: req.body.useremail })
    if (user) {
      let flag = await comparePwd(req.body.password, user.password);
      if (flag) {
        res.status(200).send({
          "status": true,
          "message": ''
        });
      } else {
        res.status(401).send({
          "status": false,
          "message": 'Incorrect Password'
        });
      }
    } else {
      res.status(401).send({
        "status": false,
        "message": 'User does not exists'
      });
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
