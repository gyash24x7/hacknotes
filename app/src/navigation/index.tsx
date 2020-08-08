import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import React, { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";
import { useQuery } from "react-query";
import { me } from "../api/user";
import { AuthProvider } from "../utils/context";
import { PrivateScreen } from "./PrivateScreen";
import { PublicScreen } from "./PublicScreen";

enableScreens();
const { Navigator, Screen } = createStackNavigator();

export const AppNavigation = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
	const { error, data } = useQuery("me", me, {
		retry: false,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (error) setIsAuthenticated(false);
		if (data) setIsAuthenticated(true);
	}, [error, data]);

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
