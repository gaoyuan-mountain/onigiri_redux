"use strict";

const path = require('path');
const argv = require('yargs').argv;

const debug = require('debug')('onigiri:config');
debug('Create configuration.');

const config = {
	env: process.env.NODE_ENV,

	path_base: path.resolve(__dirname, '../'),
	dir_client: 'src',
	dir_dist: 'dist',
	dir_server: 'server',
	dir_test: 'tests',

	server_host: 'localhost',
	server_port: process.env.PORT || 3000,

	compiler_source_maps: true,
	compiler_hash_type: 'hash',
	compiler_inline_manifest: false,
	compiler_fail_on_warning: false,
	compiler_quiet: false,
	compiler_public_path: '/',
	compiler_vendor: [
		'history',
		'react',
		'react-redux',
		'react-router',
		'redux',
		'redux-simple-router'
	],

	coverage_enabled: !!argv.coverage,
	coverage_reporters: [
		{ type: 'text-summary' },
		{ type: 'html', dir: 'coverage' }
	],

	db: {
		connection: 'mongodb://127.0.0.1:27017/onigiri'
	},

	cookieSecret: 'gy'
};

config.globals = {
	'process.env': {
		'NODE_ENV': JSON.stringify(config.env)
	},
	'NODE_ENV': config.env,
	'__DEV__': config.env === 'development',
	'__PROPD__': config.env === 'production',
	'__DEBUG__': config.env === 'development' && !argv.no_debug,
	'__DEBUG_NW__': !!argv.nw
};

const pkg = require('../package.json');

config.compiler_vendor  = config.compiler_vendor.filter(dep => {
	if (pkg.dependencies[dep]) return true;

	debug(
		`Package "${dep}" was not found as an dependency in package.json; ` +
		`it won't be included in the webpack vendor bundle.\n` + 
		`Consider removing it from vendor_dependencies in ~/config/index.js`
	);
});

config.utils_paths = (() => {
	const resolve = path.resolve;
	const base = (...args) => 
		resolve.apply(resolve, [config.path_base, ...args]);
	return {
		base: base,
		client: base.bind(null, config.dir_client),
		dist: base.bind(null, config.dir_dist)
	}
})();

config.utils_aliases = [
	'actions',
	'components',
	'constainers',
	'layouts',
	'reducers',
	'routes',
	'services',
	'store',
	'styles',
	'utils',
	'views'
].reduce((acc, dir) => {
	acc[dir] = config.utils_paths.client(dir);
	return acc;
}, {});

debug('Apply environment overrides.');

const targetConfig = argv.config || config.env;
let overrides;

try {
	overrides = require(`./_${targetConfig}`)(config);
} catch (e) {
	debug(
		`No configuration overrides found for NODE_ENV "${targetConfig}"`
	);
}

module.exports = Object.assign({}, config, overrides);