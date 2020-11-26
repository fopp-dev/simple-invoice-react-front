import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-modal-video/scss/modal-video.scss';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import { Provider } from "react-redux";
import {store} from "./redux/storeConfig/store";
// import './css/style.css';
import './scss/main.scss';
import { setTranslations, setDefaultLanguage } from 'react-multi-lang';
import en from './assets/i18n/en.json';
import ReduxToastr from 'react-redux-toastr';

setTranslations({en});
setDefaultLanguage('en');

ReactDOM.render(
	<Provider store={store}>
		<App />
		<ReduxToastr
			timeOut={2000}
			newestOnTop={false}
			preventDuplicates
			position="top-right"
			getState={(state) => state.toastr} // This is the default
			transitionIn="fadeIn"
			transitionOut="fadeOut"
			progressBar
			closeOnToastrClick/>
	</Provider>,
	document.getElementById('root')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
