import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import React, { Fragment } from "react";
import { AppNavigation } from "./navigation";
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
		<Fragment>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider
				{...eva}
				theme={{ ...eva.light, ...theme }}
				customMapping={mapping as any}
			>
				<AppNavigation />
			</ApplicationProvider>
		</Fragment>
	);
}
