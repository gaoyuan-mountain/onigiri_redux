"use strict";

const debug = require('debug')('onigiri:webpack:development');
debug('Create configuration.');

const webpackConfig = require('./_base');

webpackConfig.devtool = 'source-map';

module.exports = webpackConfig;