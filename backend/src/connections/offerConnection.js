const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Offer} = require('../models/offer.model');
const config = require('../config/config');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/node-boilerplate',
  config.mongoose.options)
  .then(() => console.log('db connected'));

app.post('http://localhost:3000/v1/offers',
  async (req, res) => {
    const offer = req.body.offer;
   // const documents = req.body.documents;

    const formData = new Offer({
      offer: offer,
      //documents: documents
    });

    try {
      await formData.save();
      res.send('inserted data');
    } catch (error) {
      console.log(error);
    }

  });
