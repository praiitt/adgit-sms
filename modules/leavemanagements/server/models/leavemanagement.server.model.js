'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Leavemanagement Schema

var LeavemanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Leavemanagement name',
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

mongoose.model('Leavemanagement', LeavemanagementSchema);

 */

var LeaveManagement = new Schema({
  leave_id: {
    type: Number
  },
  leave_name: {
    type: String
  },
  leave_start_date: {
    type: String
  },
  leave_end_date: {
    type: String
  },
  leave_duration: {
    type: String
  },
  leave_type: {
    type: String
  },
  leave_reason: {
    type: String
  },
  leave_approved_by: {
    type: String
  },
  leave_taken_by_id: {
    type: String
  }
  });
  
  mongoose.model('Leavemanagement', LeaveManagement);