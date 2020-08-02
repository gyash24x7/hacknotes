import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { ArchiveScreen } from "../screens/Archive";
import { HomeScreen } from "../screens/Home";
import { TrashScreen } from "../screens/Trash";

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateScreen = () => {
	return (
		<Navigator>
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Archive" component={ArchiveScreen} />
			<Screen name="Trash" component={TrashScreen} />
		</Navigator>
	);
};
