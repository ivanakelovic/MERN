const express = require('express');
const mongoose = require('mongoose');
const {loginUser} = require('../models');
const cors = require('cors');
//const cookieParser=require('cookie-parser');
const config = require('../config/config');
const bodyParser = require('body-parser');
const {loginUserWithEmailAndPassword} = require("../services/auth.service");

const app = express();

mongoose.connect('mongodb://localhost:27017/node-boilerplate',
  config.mongoose.options
).then(() => console.log('DB Connected'));

app.use(bodyParser.json());
app.use(cors());

app.post('http://localhost:3000/v1/auth/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await loginUser.findOne({email});
    if (user) {
      if (user.password === password) {
        res.status(200).json({message: 'Successful login'});
      } else {
        res.status(401).json({error: 'Invalid password'});
      }
    } else {
      res.status(401).json({error: 'User not found'});
    }
  }
);

