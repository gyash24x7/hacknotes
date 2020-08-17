import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppLoader } from "../components/AppLoader";

export const LoadingScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<AppLoader />
		</SafeAreaView>
	);
};
