import { Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContainer } from "../components/AppContainer";
import { TopNav } from "../components/AppNav";

export const ProfileScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav title="Profile" color="TRANSPARENT" screen="Profile" />
			<AppContainer>
				<Text>Profile Screen</Text>
			</AppContainer>
		</SafeAreaView>
	);
};
