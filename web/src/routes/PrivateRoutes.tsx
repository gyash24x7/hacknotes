import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AppNav } from "../components/common/AppNav";
import { PageWrapper } from "../components/common/PageWrapper";
import { ArchivePage } from "../pages/Archive";
import { HomePage } from "../pages/Home";

export const PrivateRoutes = () => {
	return (
		<BrowserRouter>
			<PageWrapper>
				<AppNav />
				<Switch>
					<Route path="/archive" component={ArchivePage} exact />
					<Route path="/" component={HomePage} exact />
					<Redirect from="/login" to="/" exact />
					<Redirect from="/signup" to="/" exact />
				</Switch>
			</PageWrapper>
		</BrowserRouter>
	);
};
