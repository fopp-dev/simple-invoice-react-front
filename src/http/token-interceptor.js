export const getToken = () => {
	return new Promise((resolve, reject) => {
		let token = null;
		if (localStorage.getItem('mtaji-token')) {
			token = localStorage.getItem('mtaji-token');
		}
		resolve(token);
	});
};
