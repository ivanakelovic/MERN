const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {User} = require('../models');
const config = require('../config/config');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/node-boilerplate',
  config.mongoose.options
).then(() => console.log('DB Connected'));

app.use(bodyParser.json());
app.use(cors());


app.post('http://localhost:3000/v1/auth/register', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const formData = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  });

  try {
    await formData.save();
    res.send('inserted data');
  } catch (error) {
    console.log(error);
  }

})

