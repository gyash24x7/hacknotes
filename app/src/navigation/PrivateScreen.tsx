import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { DrawerNav } from "../components/AppNav";
import { ArchiveScreen } from "../screens/Archive";
import { HomeScreen } from "../screens/Home";
import { ProfileScreen } from "../screens/Profile";
import { TrashScreen } from "../screens/Trash";
import { ViewNoteScreen } from "../screens/ViewNote";
import { AppScreenParamList } from "../utils/types";

const { Navigator, Screen } = createDrawerNavigator<AppScreenParamList>();

export const PrivateScreen = () => {
	return (
		<Navigator drawerContent={DrawerNav}>
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Archive" component={ArchiveScreen} />
			<Screen name="Trash" component={TrashScreen} />
			<Screen name="Profile" component={ProfileScreen} />
			<Screen name="ViewNote" component={ViewNoteScreen} />
			{/* <Screen name="NewNote" component={NewNoteScreen} /> */}
		</Navigator>
	);
};
