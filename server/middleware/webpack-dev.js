"use strict";

const WebpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../../config');

const paths = config.utils_paths;
const debug = require('debug')('onigiri:webpack-dev');

module.exports = function ({compiler, publicPath}) {
	debug('Enable Webpack dev middleware.');

	return WebpackDevMiddleware(compiler, {
		publicPath,
		hot: true,
		quiet: config.compiler_quiet,
		noInfo: config.compiler_quiet,
		lazy: false,
		stats: {
			colors: true
		}
	});
};