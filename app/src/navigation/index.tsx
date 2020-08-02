import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import is from "is_js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLoader } from "../components/AppLoader";
import { AppStore } from "../store";
import { me } from "../store/user/thunks";
import { AsyncActionStatus, User, UserActions } from "../utils/types";
import { PrivateScreen } from "./PrivateScreen";
import { PublicScreen } from "./PublicScreen";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	const user = useSelector<AppStore, User | null>((store) => store.user.user);
	const dispatch = useDispatch();
	const meStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.user.status[UserActions.ME]
	);

	useEffect(() => {
		dispatch(me());
	}, []);

	return (
		<NavigationContainer>
			<Navigator headerMode="none">
				{is.not.equal(meStatus, AsyncActionStatus.LOADING) ? (
					is.not.null(user) ? (
						<Screen name="Private" component={PrivateScreen} />
					) : (
						<Screen name="Public" component={PublicScreen} />
					)
				) : (
					<Screen name="Loading" component={AppLoader} />
				)}
			</Navigator>
		</NavigationContainer>
	);
};
