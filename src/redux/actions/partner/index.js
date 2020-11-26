import {types} from '../../types/partner';

export const loadPartnerCustomersAction = (partnerId) => ({
	type: types.LOAD_PARTNER_CUSTOMERS,
	payload: {
		partnerId,
	}
});

export const approveApplicationAction = (customerId, data, pathInfo) => ({
	type: types.APPROVE_APPLICATION,
	payload: {
		customerId,
		data,
		pathInfo,
	}
});

export const loadFutureInstallmentsAction = (partnerId, customerId, data) => ({
	type: types.LOAD_FUTURE_INSTALLMENTS,
	payload: {
		partnerId,
		customerId,
		data
	}
});

export const loadPastInstallmentsAction = (partnerId, customerId, data) => ({
	type: types.LOAD_PAST_INSTALLMENTS,
	payload: {
		partnerId,
		customerId,
		data,
	}
});

export const loadInvoicesAction = (partnerId, customerId, data) => ({
	type: types.LOAD_INVOICES,
	payload: {
		partnerId,
		customerId,
		data,
	}
});

export const loadPartnerCreditInformationAction = (partnerId) => ({
	type: types.LOAD_PARTNER_CREDIT_INFORMATION,
	payload: {
		partnerId,
	}
});

export const updateInstallmentCommentAction = (installmentId, data) => ({
	type: types.UPDATE_INSTALLMENT_COMMENT,
	payload: {
		installmentId,
		data,
	}
});
