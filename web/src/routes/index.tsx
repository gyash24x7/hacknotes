import Spinner from "@atlaskit/spinner";
import is from "is_js";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useMount } from "react-use";
import { AppLoader } from "../components/common/AppLoader";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { SignupPage } from "../pages/Signup";
import { AppStore } from "../store";
import { me } from "../store/user/thunks";
import { AsyncActionStatus, User, UserActions } from "../utils/types";

export const AppRoutes = () => {
	const user = useSelector<AppStore, User | null>((store) => store.user.user);
	const dispatch = useDispatch();
	const meStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.user.status[UserActions.ME]
	);

	useMount(() => {
		if (localStorage.getItem("authToken")) dispatch(me());
	});

	if (is.equal(meStatus, AsyncActionStatus.LOADING)) {
		return (
			<AppLoader>
				<Spinner />
			</AppLoader>
		);
	}

	return (
		<BrowserRouter>
			<Switch>
				{is.null(user) ? (
					<Fragment>
						<Route path="/login" component={LoginPage} />
						<Route path="/signup" component={SignupPage} />
						<Redirect to="/login" />
					</Fragment>
				) : (
					<Fragment>
						<Route path="/" component={HomePage} />
						<Redirect to="/" />
					</Fragment>
				)}
			</Switch>
		</BrowserRouter>
	);
};
