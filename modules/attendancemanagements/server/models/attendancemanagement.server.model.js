'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Attendancemanagement Schema

var AttendancemanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Attendancemanagement name',
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

mongoose.model('Attendancemanagement', AttendancemanagementSchema);
 */

var AttendanceRecord = new Schema({

  time_in: {
    type: String
  },
  time_out: {
    type: String
  },
  duration_spent:{
    type: Number
  }
  
});

mongoose.model('Attendancemanagement', AttendanceRecord);
