export const customerRoles = [
	'Owner',
	'Board Member',
	'Manager'
];

export const endpoints = {
	login: 'auth/login',
	resetPassword: 'auth/reset-password',
	userDetail: 'user/detail',
	allUsers: 'user/all',
	unregisteredPartners: 'user/partners-unregistered',
	createUser: 'user/create',
	updateUser: 'user/update',
	registerCustomer: 'customer/application-create',
	saveStep1: 'customer/application-customer-save-step1',
	saveStep2: 'customer/application-customer-save-step2',
	saveStep3: 'customer/application-customer-save-step3',
	saveStep4: 'customer/application-customer-save-step4',
	submitApplication: 'customer/application-customer-submit',
	approveApplication: 'customer/application-partner-approve',
	submitDocuments: 'customer/application-partner-submit-docs',
	activateCustomer: 'customer/application-mtaji-activate-customer',
	customerMain: 'customer/main',
	customerPersons: 'customer/persons',
	customerDocuments: 'customer/documents',
	upload: 'upload',
	partnerCustomers: 'partner/customers',
	loadAllPartners: 'partner/all',
	loadAllCustomers: 'customer/all',
	registerInvoice: 'partner/register-invoice',
	loadInstallmentsNotFullyPaid: 'customer/installments-not-fully-paid',
	loadCustomerCreditInformation: 'customer/credit-information',
	loadNextPayment: 'customer/next-payment',
	registerPayment: 'partner/register-payment',
	loadFutureInstallments: 'partner/future-installments',
	loadPastInstallments: 'partner/past-installments',
	loadInvoices: 'partner/invoices',
	loadPartnerCreditInformation: 'partner/credit-information',
	changeCredit: 'mtaji/change-credit',
	closeCredit: 'mtaji/close-credit',
	loadCreditChangeLog: 'customer/credit-change-log',
	addBankStatement: 'partner/add-bank-statement',
	updateInstallmentComment: 'partner/installment/update-comment'
};

export const userRoles = {
	customer: 'customer',
	partner: 'partner',
	mtaji_local_admin: 'mtaji local admin',
	mtaji_local_credit: 'mtaji local credit',
	mtaji_global_credit: 'mtaji global credit'
};

export const companyDocuments = [
	'Customer Document1',
	'Customer Document2',
	'Customer Document3'
];

export const personDocuments = [
	'Person Document1',
	'Person Document2',
	'Person Document3'
];

export const partnerSignedDocuments = [
	'Signed Tax',
	'Signed Retail',
];

export const CUSTOMER_REGISTRATION_STEPS = {
	'1_CREATE_CUSTOMER': '1_CREATE_CUSTOMER',
	'2_SUBMIT_APPLICATION': '2_SUBMIT_APPLICATION',
	'3_PARTNER_APPROVE_APPLICATION': '3_PARTNER_APPROVE_APPLICATION',
	'8_SIGN_LOAN_DOCUMENTS': '8_SIGN_LOAN_DOCUMENTS',
	'9_APPROVE_CREDIT': '9_APPROVE_CREDIT',
};

export const CUSTOMER_APPLICATION_STATUS = {
	STARTED: 'started',
	COMPLETED: 'completed',
};

export const CUSTOMER_OVERVIEW_FLOWS = [
	{
		id: 1,
		path: (id) =>  `/customer-overview/${id}/account-creating`,
		title: 'Account Credit Creating',
	},
	{
		id: 2,
		path: (id) =>  `/customer-overview/${id}/upload-documents`,
		title: 'Upload Documents',
	},
	{
		id: 3,
		path: (id) =>  `/customer-overview/${id}/sign-off`,
		title: 'Sign Off',
	},
	{
		id: 4,
		title: 'Pre Screening Mtaji',
	},
	{
		id: 5,
		title: 'Credit Evaluation',
	},
	{
		id: 6,
		title: 'Credit Decision',
	},
	{
		id: 7,
		title: 'Partner Decision',
	},
	{
		id: 8,
		path: (id) =>  `/customer-overview/${id}/final-sign`,
		title: 'Document Sign',
	},
	{
		id: 9,
		path: (id) =>  `/customer-overview/${id}/activate-credit`,
		title: 'Activate Credit',
	},
];

export const TIME_PERIODS = [
	{
		title: 'Today',
		gap: 1,
	},
	{
		title: 'Last 7 days',
		gap: 7,
	},
	{
		title: 'Last 30 days',
		gap: 30,
	}
];

export const FUTURE_TIME_PERIODS = [
	{
		title: 'Today',
		gap: 1,
	},
	{
		title: 'Next 7 days',
		gap: 7,
	},
	{
		title: 'Next 30 days',
		gap: 30,
	}
];

export const PAST_TIME_PERIODS = [
	{
		title: 'Yesterday',
		gap: -1,
	},
	{
		title: 'Last 7 days',
		gap: -7,
	},
	{
		title: 'Last 30 days',
		gap: -30,
	}
];

export const ERROR_MESSAGES = {
	ERR_AUTH_PASSWORD_NOT_CORRECT: 'Password is not correct',
	ERR_AUTH_ERR_USER_NOT_FOUND: 'Email is not correct',
	ERR_INTERNAL_SERVER_ERROR: 'Something went wrong',
	ERR_USER_NOT_FOUND: 'User not found',
	ERR_PARTNER_NOT_SELECTED: 'Please select partner',
	ERR_PARTNER_NOT_FOUND: 'Partner not found',
	ERR_CUSTOMER_NOT_FOUND: 'Customer not found',
};
