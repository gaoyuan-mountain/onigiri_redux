"use strict";

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../../config');

const paths = config.utils_paths;

const debug = require('debug')('onigiri:webpack:_base');
debug('Create configuration.');

const CSS_MODULES_LOADER = [
	'css-loader?modules',
	'sourceMap',
	'importLoaders=1',
	'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');

const webpackConfig = {
	name: 'client',
	target: 'web',
	entry: {
		app: [
			paths.base(config.dir_client) + '/app.jsx'
		],
		vendor: config.compiler_vendor
	},
	output: {
		filename: `[name].[${config.compiler_hash_type}].js`,
		path: paths.base(config.dir_dist),
		publicPath: config.compiler_public_path
	},
	plugins: [
		new webpack.DefinePlugin(config.globals),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new HtmlWebpackPlugin({
			template: paths.client('index.html'),
			hash: false,
			filename: 'index.html',
			inject: 'body',
			minify: {
				collapseWhitespace: true
			}
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: config.utils_aliases
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					stage: 0,
					optional: ['runtime'],
					env: {
						development: {
							plugins: ['react-transform'],
							extra: {
								'react-transform': {
									transforms: [{
										transform: 'react-transform-catch-errors',
										imports: ['react', 'redbox-react']
									}]
								}
							}
						}
					}
				}
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					CSS_MODULES_LOADER,
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					CSS_MODULES_LOADER
				]
			},
			/* eslint-disable */
			{ test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
			{ test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
			{ test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" },
			{ test: /\.(png|jpg)$/,    loader: 'url-loader?limit=8192' }
			/* eslint-enable */
		]
	},
	sassLoader: {
		includePaths: paths.client('styles')
	}
};

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  names : ['vendor', 'manifest']
});
commonChunkPlugin.__KARMA_IGNORE__ = true;

webpackConfig.plugins.push(commonChunkPlugin);

module.exports = webpackConfig;
