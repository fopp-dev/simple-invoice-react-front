import get from 'lodash/get';

export const getPartnerCustomers = (state) => {
	return get(state, "partner.partnerCustomers");
};

export const getFutureInstallments = (state) => {
	return get(state, "partner.futureInstallments");
};

export const getPastInstallments = (state) => {
	return get(state, "partner.pastInstallments");
};

export const getInvoices = (state) => {
	return get(state, "partner.invoices");
};

export const getPartnerCreditInformation = (state) => {
	return get(state, "partner.creditInformation");
};
