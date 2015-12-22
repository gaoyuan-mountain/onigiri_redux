"use strict";

const WebpackHotMiddleware = require('webpack-hot-middleware');

const debug = require('debug')('onigiri:webpack-hmr');

module.exports = function ({ compiler }) {
	debug('Enable Webpack Hot Module Replacement (HMR).');
	return WebpackHotMiddleware(compiler);
};