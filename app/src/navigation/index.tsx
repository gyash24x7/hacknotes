import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import { AuthProvider } from "../utils/context";
import { useMeQuery } from "../utils/hooks";
import { PrivateScreen } from "./PrivateScreen";
import { PublicScreen } from "./PublicScreen";

enableScreens();
const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
	useMeQuery({
		onSuccess: () => setIsAuthenticated(true),
		onError: () => setIsAuthenticated(false)
	});

	if (typeof isAuthenticated !== "undefined") {
		return (
			<AuthProvider value={{ isAuthenticated, setIsAuthenticated }}>
				<NavigationContainer>
					<Navigator headerMode="none">
						{isAuthenticated ? (
							<Screen name="Private" component={PrivateScreen} />
						) : (
							<Screen name="Public" component={PublicScreen} />
						)}
					</Navigator>
				</NavigationContainer>
			</AuthProvider>
		);
	}

	return <AppLoading />;
};
