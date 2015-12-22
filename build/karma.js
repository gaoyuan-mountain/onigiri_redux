"use strict";

const argv = require('yargs').argv;
const config = require('../config');

const debug = require('debug')('onigiri:karma');
debug('Create configuration.');

const KARMA_ENTRY_FILE = 'karma.entry.js';
const webpackConfig = require('./webpack/' + config.env);

const karmaConfig = {
	basePath: '../',
	files: [
		'./node_modules/phantomjs-polyfill/bind-polyfill.js',
		`./${config.dir_test}/**/*.js`,
		'./' + KARMA_ENTRY_FILE
	],
	singleRun: !argv.watch,
	frameworks: ['mocha', 'sinon-chai', 'chai-as-promised', 'chai'],
	preprocessors: {
		[KARMA_ENTRY_FILE]: ['webpack'],
		[`${config.dir_test}/**/*.js`]: ['webpack']
	},
	reporters: ['spec'],
	browsers: ['PhantomJS'],
	webpack: {
		devtool: 'inline-source-map',
		resolve: webpackConfig.resolve,
		plugins: webpackConfig.plugins.filter(plugin => !plugin.__KARMA_IGNORE__),
		module: {
			loaders: webpackConfig.module.loaders
		},
		sassLoader: webpackConfig.sassLoader
	},
	webpackMiddleware: {
		noInfo: true
	},
	coverageReporter: {
		reporters: config.coverage_reporters
	}
};

if (config.coverage_enabled) {
	karmaConfig.reporters.push('coverage');
	karmaConfig.webpack.module.preLoaders = [{
		test: /\.(js|jsx)$/,
		include: new RegExp(config.get('dir_client')),
		loader: 'isparta'
	}];
}

module.exports = (cfg) => cfg.set(karmaConfig);
