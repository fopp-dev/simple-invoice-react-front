import axios from 'axios';
import {getToken} from "./token-interceptor";
import history from "../history";

export const handleErrorIfAvailable = httpResponse => {
	if (httpResponse.status === 401 || httpResponse.statusCode === 401) {
		localStorage.clear();
		history.push('/signin');
	}
};

export const makeGetRequest = async (
	url,
	attachToken = false,
	params = null
) => {

	let headers = {
		Accept: "application/json",
		"Content-Type": "application/json"
	};
	if (attachToken) {
		try {
			const authToken = await getToken();

			if (authToken) {
				headers["authorization"] = `Bearer ${authToken}`;
			}
		} catch (e) {
			console.log('Error fetching auth token: ', e);
		}
	}

	return new Promise((resolve, reject) => {
		axios.get(url, {
			params,
			headers
		})
			.then(response => {
				handleErrorIfAvailable(response);
				if (response.data.statusCode === 200) {
					resolve(response.data.response);
				} else {
					reject(response.data);
				}
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const makePostRequest = async (
	url,
	attachToken = false,
	params = {}
) => {

	let headers = {
		Accept: "application/json",
		"Content-Type": "application/json"
	};
	if (attachToken) {
		try {
			const authToken = await getToken();

			if (authToken) {
				headers["authorization"] = `Bearer ${authToken}`;
			}
		} catch (e) {
			console.log('Error fetching auth token: ', e);
		}
	}

	return new Promise((resolve, reject) => {
		try {
			axios.post(url, params, {
				headers
			})
				.then(response => {
					handleErrorIfAvailable(response);
					if (response.data.statusCode === 200) {
						resolve(response.data.response);
					} else {
						reject(response.data);
					}
				})
				.catch(error => {
					reject(error);
				});
		} catch (e) {
			reject();
		}
	});
};

export const makePutRequest = async (
	url,
	attachToken = false,
	params = {}
) => {

	let headers = {
		Accept: "application/json",
		"Content-Type": "application/json"
	};
	if (attachToken) {
		try {
			const authToken = await getToken();

			if (authToken) {
				headers["authorization"] = `Bearer ${authToken}`;
			}
		} catch (e) {
			console.log('Error fetching auth token: ', e);
		}
	}

	return new Promise((resolve, reject) => {
		try {
			axios.put(url, params, {
				headers
			})
				.then(response => {
					handleErrorIfAvailable(response);
					if (response.data.statusCode === 200) {
						resolve(response.data.response);
					} else {
						reject(response.data);
					}
				})
				.catch(error => {
					reject(error);
				});
		} catch (e) {
			reject();
		}
	});
};
