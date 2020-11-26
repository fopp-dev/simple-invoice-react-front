import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom';

export const CustomerPrivateRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={(props) => {
		const role = localStorage.getItem('role');
		return (
			role === 'customer'
				? <Component {...props} />
				: <Redirect to='/signin'/>
		);
	}}
	/>
);
