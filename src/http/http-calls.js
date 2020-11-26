/**
 * @param data: {email: string, password: string}
 */
import {makePostRequest, makeGetRequest, makePutRequest} from "./http-service";
import {config} from "../config";
import {endpoints} from "../constants";

export const login = (data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.login, false, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const resetPassword = (data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.resetPassword, false, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadUserDetail = (id) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.userDetail + `/${id}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadAllUsers = () => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.allUsers, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const createUser = (user) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.createUser, true, user)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const updateUser = (id, data) => {
	return new Promise((resolve, reject) => {
		makePutRequest(config.baseUrl + endpoints.updateUser + `/${id}`, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const registerCustomer = (data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.registerCustomer, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const saveStep1 = (customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.saveStep1 + '/' + customerId, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const saveStep2 = (customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.saveStep2 + '/' + customerId, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const saveStep3 = (customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.saveStep3 + '/' + customerId, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const saveStep4 = (customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.saveStep4 + '/' + customerId, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const submitApplication = (customerId) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.submitApplication + '/' + customerId, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadCustomerPersons = (customerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.customerPersons + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

/**
 * @description load customer documents by customer id
 * @param customerId
 * @return {Promise<unknown>}
 */
export const loadCustomerDocuments = (customerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.customerDocuments + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

/**
 * @description load customer documents by customer id
 * @param customerId
 * @return {Promise<unknown>}
 */
export const loadCustomerMain = (customerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.customerMain + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const uploadFile = (payload) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.upload, true, payload)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadPartnerCustomers = (partnerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.partnerCustomers + `/${partnerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const approveApplication = (customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.approveApplication + `/${customerId}`, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const submitDocuments = (customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.submitDocuments + `/${customerId}`, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadAllPartners = () => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.loadAllPartners, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadAllCustomers = () => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.loadAllCustomers, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const updateInstallmentComment = (installmentId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.updateInstallmentComment + '/' + installmentId, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const activateCustomer = (customerId) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.activateCustomer + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const registerInvoice = (data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.registerInvoice, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadInstallmentsNotFullyPaid = (customerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.loadInstallmentsNotFullyPaid + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadCustomerCreditInformation = (customerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.loadCustomerCreditInformation + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadNextPayment = (customerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.loadNextPayment + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const registerPayment = (customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.registerPayment + `/${customerId}`, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadFutureInstallments = (partnerId, customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.loadFutureInstallments + `/${partnerId}/${customerId}`, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadPastInstallments = (partnerId, customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.loadPastInstallments + `/${partnerId}/${customerId}`, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadInvoices = (partnerId, customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.loadInvoices + `/${partnerId}/${customerId}`, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadPartnerCreditInformation = (partnerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.loadPartnerCreditInformation + `/${partnerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const changeCredit = (customerId, data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.changeCredit + `/${customerId}`, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const closeCredit = (customerId) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.closeCredit + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const loadCreditChaneLog = (customerId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endpoints.loadCreditChangeLog + `/${customerId}`, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export const addBankStatement = (data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endpoints.addBankStatement, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};
