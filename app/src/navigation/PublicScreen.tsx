import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "../screens/Login";
import { SignupScreen } from "../screens/Signup";

const { Navigator, Screen } = createStackNavigator();

export const PublicScreen = () => {
	return (
		<Navigator headerMode="none">
			<Screen name="Login" component={LoginScreen} />
			<Screen name="Signup" component={SignupScreen} />
		</Navigator>
	);
};
