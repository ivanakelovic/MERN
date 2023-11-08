const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');


const offerSchema = new mongoose.Schema({
    offer: {
      type: Number,
      default: 1,
      required: [true, 'An offer must have a value!'],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: 'Your offer must be a positive number!',
      }
    },
    tender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Tender',
      required: true
    }, documents: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, 'An offer must have a document!'],
      trim: true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
  isSelected:{
      type:Boolean,
    required:[true,'An offer must have isSelected field'],
    default:false
  }
  },
  {
    timestamps: true,
  }
)


// add plugin that converts mongoose to json
offerSchema.plugin(toJSON);
offerSchema.plugin(paginate);


offerSchema.pre('save', async function (next) {
  const offer = this;
  next();
});
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
