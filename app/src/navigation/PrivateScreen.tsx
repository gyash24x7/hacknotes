import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { DrawerNav } from "../components/AppNav";
import { ArchiveScreen } from "../screens/Archive";
import { HomeScreen } from "../screens/Home";
import { NoteScreen } from "../screens/Note";
import { ProfileScreen } from "../screens/Profile";
import { TrashScreen } from "../screens/Trash";
import { AppScreenParamList } from "../utils/types";

const { Navigator, Screen } = createDrawerNavigator<AppScreenParamList>();

export const PrivateScreen = () => {
	return (
		<Navigator drawerContent={DrawerNav}>
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Archive" component={ArchiveScreen} />
			<Screen name="Trash" component={TrashScreen} />
			<Screen name="Profile" component={ProfileScreen} />
			<Screen name="Note" component={NoteScreen} />
		</Navigator>
	);
};
