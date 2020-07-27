import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { SignupPage } from "../pages/Signup";

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={LoginPage} />
				<Route path="/signup" component={SignupPage} />
				<Route path="/" component={HomePage} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
};
