"use strict";

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../../config');

const debug = require('debug')('onigiri:webpack:production');
debug('Create configuration.');

const webpackConfig = require('./_base');

if (config.compiler_source_maps) {
	debug('Source maps enabled for production.');
	webpackConfig.devtool = 'source-map';
} else {
	debug('Source maps are disabled in production.');
}

debug('Apply ExtractTextPlugin to css loaders.');
webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
	if (/css/.test(loader.test)) {
		const [first, ...rest] = loader.loaders;
		loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
		delete loader.loaders;
	}
	return loader;
});

webpackConfig.plugins.push(
	new ExtractTextPlugin('[name].[contentPath].css', {
		allChunks: true
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			unused: true,
			dead_code: true
		}
	})
);

module.exports = webpackConfig;