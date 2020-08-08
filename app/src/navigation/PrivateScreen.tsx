import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { DrawerNav } from "../components/AppNav";
import { ArchiveScreen } from "../screens/Archive";
import { HomeScreen } from "../screens/Home";
import { NoteScreen } from "../screens/Note";
import { ProfileScreen } from "../screens/Profile";
import { TrashScreen } from "../screens/Trash";

const { Navigator, Screen } = createDrawerNavigator();

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
