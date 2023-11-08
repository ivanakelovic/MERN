const mongoose = require('mongoose');
const {Schema} = mongoose;
const {toJSON, paginate} = require('./plugins');
const EvaluationSchema = new Schema({
  /* proposal: {
     type: String,
     ref: 'Proposal',
     required: [true, 'Proposal is required'],
   },*/
  rating: {
    type: Number,
    min: [1, 'Rating should be at least 1'],
    max: [5, 'Rating should not exceed 5'],
    required: [true, 'Rating is required'],
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
  },
  collaborators: {
    type: String,
    required: [true, 'Collaborators are required'],
  },
  offer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Offer',
    required: true
  }

}, {
  timestamps: true,
});
// add plugin that converts mongoose to json
EvaluationSchema.plugin(toJSON);
EvaluationSchema.plugin(paginate);
const Evaluation = mongoose.model('Evaluation', EvaluationSchema);
module.exports = Evaluation;
