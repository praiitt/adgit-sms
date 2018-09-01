'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Feemanagement Schema

var FeemanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Feemanagement name',
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

mongoose.model('Feemanagement', FeemanagementSchema);
 */

var FeeDetails = new Schema({
  fee_id: {
    type: Number
  },
  fee_type: {
    type: String
  },
  fee_cost: {
    type: String
  },
  tax: {
    type: Number
  },
  fee_category: {
    type: String
  },
  fee_subsidy: {
    type: Number
  },
  concssion_code: {
    type: Number
  }
  });
  
  mongoose.model('Feemanagement', FeeDetails);