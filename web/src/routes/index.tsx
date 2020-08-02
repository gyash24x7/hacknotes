import is from "is_js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount } from "react-use";
import AppLoader from "../components/common/AppLoader";
import { AppStore } from "../store";
import { me } from "../store/user/thunks";
import { AsyncActionStatus, User, UserActions } from "../utils/types";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
	const user = useSelector<AppStore, User | null>((store) => store.user.user);
	const dispatch = useDispatch();
	const meStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.user.status[UserActions.ME]
	);

	useMount(() => {
		dispatch(me());
	});

	if (is.not.equal(meStatus, AsyncActionStatus.LOADING)) {
		if (is.not.null(user)) return <PrivateRoutes />;
		else return <PublicRoutes />;
	} else {
		return <AppLoader />;
	}
};
