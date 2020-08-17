import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import SplashScreen from "react-native-splash-screen";
import { AuthProvider } from "../utils/context";
import { useMeQuery } from "../utils/hooks";
import { LoadingScreen } from "./LoadingScreen";
import { PrivateScreen } from "./PrivateScreen";
import { PublicScreen } from "./PublicScreen";

enableScreens();
const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
	useMeQuery({
		onSuccess: () => {
			setIsAuthenticated(true);
			SplashScreen.hide();
		},
		onError: () => {
			setIsAuthenticated(false);
			SplashScreen.hide();
		}
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

	return (
		<NavigationContainer>
			<Navigator headerMode="none">
				<Screen name="Loading" component={LoadingScreen} />
			</Navigator>
		</NavigationContainer>
	);
};
