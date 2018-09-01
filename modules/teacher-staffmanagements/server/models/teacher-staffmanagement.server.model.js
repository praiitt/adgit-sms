'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Teacher staffmanagement Schema
 
var TeacherStaffmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Teacher staffmanagement name',
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

mongoose.model('TeacherStaffmanagement', TeacherStaffmanagementSchema);
*/

var TeacherStaffManagement = new Schema({
  teacherstaff_id: {
    type: Number
  },
  payroll_id: {
    type: Number
  },
  routine_id: {
    type: Number
  },
  attendance_id: {
    type: Number
  },
  onlinetest_id: {
    type: Number
  },
  sports_id: {
    type: Number
  },
  library_id: {
    type: Number
  },
  transport_id: {
    type: Number
  },
  person_id: {
    type: Number
  },
  user_id: {
    type: Number
  }
  });
  
  mongoose.model('TeacherStaffmanagement', TeacherStaffManagement);