import Spinner from "@atlaskit/spinner";
import is from "is_js";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMount } from "react-use";
import { AppLoader } from "../components/common/AppLoader";
import { ArchivePage } from "../pages/Archive";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { SignupPage } from "../pages/Signup";
import { AppStore } from "../store";
import { me } from "../store/user/thunks";
import { AsyncActionStatus, UserActions } from "../utils/types";

export const AppRoutes = () => {
	const dispatch = useDispatch();
	const meStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.user.status[UserActions.ME]
	);

	useMount(() => {
		if (localStorage.getItem("authToken")) dispatch(me());
	});

	if (is.equal(meStatus, AsyncActionStatus.SUCCEEDED)) {
		console.log("here");

		return (
			<BrowserRouter>
				<Switch>
					{!localStorage.getItem("authToken") ? (
						<Fragment>
							<Route path="/login" component={LoginPage} exact />
							<Route path="/signup" component={SignupPage} exact />
						</Fragment>
					) : (
						<Fragment>
							<Route path="/archive" component={ArchivePage} exact />
							<Route path="/" component={HomePage} exact />
						</Fragment>
					)}
				</Switch>
			</BrowserRouter>
		);
	}

	return (
		<AppLoader>
			<Spinner />
		</AppLoader>
	);
};
