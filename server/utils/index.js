"use strict";

module.exports = {
	resPackage: (response = {}, status = 1) => {
		return {
			status,
			data: response.toJSON()
		};
	}
};