"use strict";

const User = require('../models').user;
const UserDao = require('../dao/user.dao');
const crypto = require('crypto');
const Util = require('../utils');

module.exports = {
	login: (req, res) => {
		UserDao.findOne({
			username: req.body.username,
			password: crypto.createHash('md5').update(req.body.password).digest('base64')
		}, function (err, user) {
			if (err) {
				return res.json(Util.resPackage(err, 0));
			} else {
				req.session.user = user;
				return res.json(Util.resPackage(req.session.user));
			}
		});
	},
	
	register: (req, res) => {
		let userCreated = Object.assign({}, req.body, {
			password: crypto.createHash('md5').update(req.body.password).digest('base64')
		})
		userCreated = new User(userCreated);
		User.findOne({
			username: req.body.username
		}, (err, user) => {
			if (err) {
				return res.json(Util.resPackage(err, 0));
			}
			if (user) {
				return res.json(Util.resPackage('user has already existed.', 0));
			}
			userCreated.save((err, user) => {
				if (err) {
					return res.json(Util.resPackage(err, 0));
				}
				res.json(Util.resPackage(user));
			});
		});
	}
};