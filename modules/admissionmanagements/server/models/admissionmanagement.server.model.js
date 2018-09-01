'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Admissionmanagement Schema

var AdmissionmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Admissionmanagement name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Admissionmanagement', AdmissionmanagementSchema);

 */


var AdmissionRecord = new Schema({
  admission_id: {
    type: Number
  },
  person_id: {
    type: Number
  },
  user_id: {
    type: Number
  },
  admission_date: {
    type: Date
  },
  admitted_to: {
    type: Number
  },
  admission_fee: {
    type: Number
  },
  admission_status: {
    type: Boolean
  },
  admission_for: {
    type: String
  },
  admission_compaign_name: {
    type: String
  },
  is_test_req: {
    type: Boolean
  },
  test_id: {
    type: Number
  }
  });
  
  mongoose.model('Admissionmanagement', AdmissionRecord);