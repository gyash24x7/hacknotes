import { Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { AppButton } from "../components/AppButton";
import { AppContainer } from "../components/AppContainer";
import { TopNav } from "../components/AppNav";
import { logout } from "../store/user/thunks";

export const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView>
			<TopNav />
			<AppContainer>
				<Text>Home Screen</Text>
				<AppButton onPress={() => dispatch(logout())}>Logout</AppButton>
			</AppContainer>
		</SafeAreaView>
	);
};
