'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Gallerymanagement Schema

var GallerymanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Gallerymanagement name',
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

mongoose.model('Gallerymanagement', GallerymanagementSchema);
 */

var SchoolGallery = new Schema({
  gallery_id: {
    type: Number
  },
  gallery_name: {
    type: String
  },
  type_of_file: {
    type: String
  },
  gallery_size: {
    type: Number
  },
  tags: {
    type: String
  },
  document_ids: {
    type: Number
  },
  event_id: {
    type: Number
  }
  });
  
  mongoose.model('Gallerymanagement', SchoolGallery);