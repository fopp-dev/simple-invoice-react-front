import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom';

export const PartnerPrivateRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={(props) => {
		const role = localStorage.getItem('role');
		return (
			role === 'partner'
				? <Component {...props} />
				: <Redirect to='/signin'/>
		);
	}}
	/>
);
