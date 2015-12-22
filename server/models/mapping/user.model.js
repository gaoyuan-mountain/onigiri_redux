'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	username: String,
	email: String,
	tel: String,
	avatar: String,
	password: String
});

mongoose.model('user', schema);
