'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Payrollmanagement Schema

var PayrollmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Payrollmanagement name',
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

mongoose.model('Payrollmanagement', PayrollmanagementSchema);

 */

var payrollManagement = new Schema({
  payroll_id: {
    type: Number
  },
  payroll_name: {
    type: String
  },
  payroll_type: {
    type: String
  },
  payroll_cost: {
    type: Number
  }
  });
  
  mongoose.model('Payrollmanagement', payrollManagement);