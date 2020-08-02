import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LogoIcon from "../assets/icon.svg";
import { MainGraphic, MainGraphicIcon } from "../components/Auth/MainGraphic";
import { PageWrapper } from "../components/common/PageWrapper";
import { LoginPage } from "../pages/Login";
import { SignupPage } from "../pages/Signup";

export const PublicRoutes = () => {
	return (
		<BrowserRouter>
			<PageWrapper>
				<MainGraphic>
					<MainGraphicIcon src={LogoIcon} />
				</MainGraphic>
				<Switch>
					<Route path="/login" component={LoginPage} exact />
					<Route path="/signup" component={SignupPage} exact />
					<Redirect to="/login" from="/" exact />
				</Switch>
			</PageWrapper>
		</BrowserRouter>
	);
};
