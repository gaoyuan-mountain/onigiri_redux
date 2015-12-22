"use strict";

const express = require('express');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const config = require('../config');
const route = require('./routes');
const authentication = require('./middleware/authentication');

const app = express();
const debug = require('debug')('onigiri:server');
const paths = config.utils_paths;

app.use(cookieParser());
app.use(session({
	secret: 'onigiri',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 24 * 60 * 60 * 1000,
        secure: false
	}
}));
app.use(authentication({
	whiteList: ['/', '/login', '/register'],
	defaultUrl: {
		auth: '/projects',
		unauth: '/login'
	}
}));
app.use(historyApiFallback({
  verbose : false
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

if (config.env === 'development') {
	const webpack = require('webpack');
	const webpackConfig = require('../build/webpack/development_hot');
	const compiler = webpack(webpackConfig);

	app.use(require('./middleware/webpack-dev')({
		compiler,
		publicPath: webpackConfig.output.publicPath
	}));
	app.use(require('./middleware/webpack-hmr')({
		compiler
	}));
} else {
	debug(
		'Application is being run outside of development mode. This starter kit ' +
		'does not provide any production-specific server functionality. To learn ' +
		'more about deployment strategies, check out the "deployment" section ' +
		'in the README.'
	);
	app.use(express.static(paths.base(config.dir_dist)));
}

route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

module.exports = app;
