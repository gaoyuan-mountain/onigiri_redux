"use strict";

const mongoose = require('mongoose');
const config = require('../../config');
const fs = require('fs');

mongoose.connect(config.db.connection);
const db = mongoose.connection;

db.on('error', (err) => {
	console.log('connect to %s error: ', config.db.connection, err.message);
	process.exit(1);
});

db.once('open', () => {
	console.log('%s has been connected', config.db.connection);
});

const models_path = __dirname + '/../models/mapping';
let models = {};
fs.readdirSync(models_path).forEach((file) => {
	require(models_path + '/' + file);
    var modelName = file.replace('.model.js', '');
    exports[modelName] = mongoose.model(modelName);
});