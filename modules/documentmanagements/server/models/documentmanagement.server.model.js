'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Documentmanagement Schema

var DocumentmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Documentmanagement name',
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

mongoose.model('Documentmanagement', DocumentmanagementSchema);

 */

var DocumentManagement = new Schema({
  document_id: {
    type: Number
  },
  document_type: {
    type: String
  },
  document_size: {
    type: String
  },
  document_status: {
    type: String
  },
  document_rights: {
    type: String
  },
  is_downloadable: {
    type: Boolean
  },
  shared_with: {
    type: String
  },
  is_deleted: {
    type: Boolean
  }
  });
  
  mongoose.model('Documentmanagement', DocumentManagement);