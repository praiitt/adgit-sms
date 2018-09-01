'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Attaindancemanagement Schema
 */
var AttaindancemanagementSchema = new Schema({

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  in_time:{
    type:Date
  },
  out_time:{
    type:Date
  },
  leave_month_wise :{
    type:Number
  },
  leave_records:{
    type:[{type:Date,type:String}]
  }

});

mongoose.model('Attaindancemanagement', AttaindancemanagementSchema);
