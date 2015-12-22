"use strict";

function DaoBase(model) {
	this.model = model;
};

//create
DaoBase.prototype.create = function (doc, callback) {
	this.model.create(doc, function (err) {
		if (err) {
			return callback(err);
		}
		return callback(doc);
	});
};

DaoBase.prototype.getById = function (id, callback) {
	this.model.findOne({
		_id: id
	}, function (err, model) {
		if (err) {
			return callback(err);
		}
		return callback(null, model);
	});
};

DaoBase.prototype.getAll = function (callback) {
	this.model.find({}, function (err, models) {
		if (err) {
			return callback(err, null);
		}
		return callback(null, models);
	});
};

DaoBase.prototype.remove = function (id, callback) {
	this.model.findByIdAndRemove(id, null, function (err, model) {
		if (err) {
			return callback(err);
		}
		return callback(null, model);
	});
};

DaoBase.prototype.update = function (conditions, update, options, callback) {
	this.model.update(conditions, update, options, function (err) {
		if (err) {
			return callback(err);
		}
		return callback(null);
	});
};

DaoBase.prototype.findOne = function (conditions, callback) {
	this.model.findOne(conditions, function (err, model) {
		if (err) {
			return callback(err, null);
		}
		return callback(null, model);
	});
}

module.exports = DaoBase;
