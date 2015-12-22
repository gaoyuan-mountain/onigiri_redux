"use strict";

const parseurl = require('parseurl');

function acceptsHtml(header) {
  return header && header.indexOf('text/html') !== -1;
};

/*
options:
	whiteList: [Array] urls which is not need authentication,
	defaultUrl: [Object]
		auth: [String] the redirect url when user is authed but the request url in white list
		unauth: [String] the redirect url when user is unauthed but request url not in white list
 */
exports = module.exports = function (options = {
		whiteList: [],
		defaultUrl: {
			auth: '/',
			unauth: '/',
		}
	}) {
	return function (req, res, next) {
		var isAcceptsHtml = acceptsHtml(req.headers.accept);
		if (!isAcceptsHtml) {
			return next();
		} else {
			let user = req.session.user;
			let pathname = parseurl(req).pathname;
			if (!user && !options.whiteList.includes(pathname)) {
				res.status(403).redirect(options.defaultUrl.unauth);
			} else if (user && options.whiteList.includes(pathname)) {
				res.status(301).redirect(options.defaultUrl.auth);
			} else {
				return next();
			}
		}
	};
};