const express = require('express');
const mongoose = require('mongoose');
const { Tender} = require('../models');
const config = require('../config/config');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/node-boilerplate',
  config.mongoose.options
).then(() => console.log('DB Connected'));
app.use(bodyParser.json());
app.use(cors());
app.post('http://localhost:3000/v1/auth/tenders', async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const criteria  = req.body.criteria;
  const weightage = req.body.weightage;
  const formData = new Tender({
    title: title,
    description: description,
    deadline: deadline,
    criteria: criteria,
    weightage: weightage
  });
  try {
    await formData.save();
    res.send('inserted data');
  } catch (error) {
    console.log(error);
  }
})
