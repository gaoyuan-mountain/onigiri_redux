"use strict";

const userRoute = require('./user.route');
const multer = require('multer');

module.exports = (app) => {
	//login
	app.post('/user/login', userRoute.login);

	//register
	app.post('/user/register', userRoute.register);
}