import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import React from "react";
import { Provider } from "react-redux";
import { AppNavigation } from "./navigation";
import { store } from "./store";
import { default as theme } from "./theme";
import { default as mapping } from "./theme/mapping.json";

export default function App() {
	const [fontsLoaded] = useFonts({
		"montserrat-regular": require("./assets/fonts/montserrat-regular.ttf"),
		"montserrat-light": require("./assets/fonts/montserrat-light.ttf"),
		"montserrat-bold": require("./assets/fonts/montserrat-bold.ttf")
	});

	if (!fontsLoaded) return <AppLoading />;

	return (
		<Provider store={store}>
			<ApplicationProvider
				{...eva}
				theme={{ ...eva.light, ...theme }}
				customMapping={mapping as any}
			>
				<AppNavigation />
			</ApplicationProvider>
		</Provider>
	);
}
