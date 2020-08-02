import { Text } from "@ui-kitten/components";
import React from "react";
import { useDispatch } from "react-redux";
import { AppButton } from "../components/AppButton";
import { AppContainer } from "../components/AppContainer";
import { logout } from "../store/user/thunks";

export const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<AppContainer>
			<Text>Home Screen</Text>
			<AppButton onPress={() => dispatch(logout())}>Logout</AppButton>
		</AppContainer>
	);
};
