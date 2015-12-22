"use strict";

const webpack = require('webpack');
const config = require('../../config');

const debug = require('debug')('onigiri:webpack:development_hot');
debug('Create configuration.');

const webpackConfig = require('./development');

webpackConfig.entry.app.push(
	`webpack-hot-middleware/client?path=/__webpack_hmr`
);

webpackConfig.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
);

webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
	if (/js(?!on)/.test(loader.test)) {
		loader.query.env.development.extra['react-transform'].transforms.push({
			transform: 'react-transform-hmr',
			imports: ['react'],
			locals: ['module']
		});
	}
	return loader;
});

module.exports = webpackConfig;