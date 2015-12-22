"use strict";

const user = require('../models').user;
const DaoBase = require('./_base.dao');
const userDao = new DaoBase(user);

module.exports = userDao;
