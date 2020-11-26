import * as jwt_decode from "jwt-decode";

export const decodeToken = () => {
	const token = localStorage.getItem('mtaji-token');
	return jwt_decode(token);
};

export const toProperCase = (str) => {
	return str.replace(/\w\S*/g, function(t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); });
};
