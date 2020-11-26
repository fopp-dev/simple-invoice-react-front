import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom';
import {userRoles} from "../../constants";

export const MtajiPrivateRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={(props) => {
		const role = localStorage.getItem('role');
		const canAccess = (
			role === userRoles.mtaji_global_credit ||
			role === userRoles.mtaji_local_credit ||
			role === userRoles.mtaji_local_admin
		);

		return (
			canAccess
				? <Component {...props} />
				: <Redirect to='/signin'/>
		);
	}}
	/>
);
