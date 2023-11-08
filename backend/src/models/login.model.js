const mongoose = require('mongoose');
const validator = require('validator');
const {toJSON, paginate} = require('./plugins');

const loginUserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
loginUserSchema.plugin(toJSON);
loginUserSchema.plugin(paginate);


const loginUser = mongoose.model('loginUser', loginUserSchema);

module.exports = loginUser;
