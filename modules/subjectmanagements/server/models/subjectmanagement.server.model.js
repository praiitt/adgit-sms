'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Subjectmanagement Schema

var SubjectmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Subjectmanagement name',
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

mongoose.model('Subjectmanagement', SubjectmanagementSchema);

 */

var SubjectManagement = new Schema({
  subject_id: {
    type: Number
  },
  subject_name: {
    type: String
  },
  subject_for: {
    type: String
  },
  subject_type: {
    type: String
  },
  subject_difficulty_level: {
    type: String
  },
  online_tutorials_link: {
    type: String
  },
  books_involved: {
    type: String
  },
  onlinetest_ids: {
    type: String
  }
  });
  
  mongoose.model('Subjectmanagement', SubjectManagement);