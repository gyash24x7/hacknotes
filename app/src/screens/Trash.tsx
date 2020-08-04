import { Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContainer } from "../components/AppContainer";
import { TopNav } from "../components/AppNav";

export const TrashScreen = () => {
	return (
		<SafeAreaView>
			<TopNav />
			<AppContainer>
				<Text>Trash Screen</Text>
			</AppContainer>
		</SafeAreaView>
	);
};
