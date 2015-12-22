"use strict";

module.exports = (config) => ({
	compiler_public_path: `http://${config.server_host}:${config.server_port}/`
});