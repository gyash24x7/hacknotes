import React from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { ArchivePage } from "../pages/Archive";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { SignupPage } from "../pages/Signup";
import { TrashPage } from "../pages/Trash";
import { useAuth } from "../utils/context";

export const AppRoutes = () => (
	<Switch>
		<PublicRoute path="/login" component={LoginPage} exact />
		<PublicRoute path="/signup" component={SignupPage} exact />
		<PrivateRoute path="/archive" component={ArchivePage} exact />
		<PrivateRoute path="/trash" component={TrashPage} exact />
		<PrivateRoute path="/" component={HomePage} exact />
	</Switch>
);

export const PrivateRoute = (props: RouteProps) => {
	const { isAuthenticated } = useAuth();
	if (isAuthenticated) return <Route {...props} />;
	else return <Redirect to="/login" />;
};

export const PublicRoute = (props: RouteProps) => {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) return <Route {...props} />;
	else return <Redirect to="/" />;
};
