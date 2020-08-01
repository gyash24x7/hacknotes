import {
	Notifications,
	Profile,
	Search,
	Settings,
	SignIn
} from "@atlaskit/atlassian-navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "react-use";
import LogoIcon from "../../assets/icon.svg";
import WordMark from "../../assets/wordmark.svg";
import { AppStore } from "../../store";
import { openDrawer } from "../../store/drawer";
import { logout } from "../../store/user/thunks";
import { DrawerModes, User } from "../../utils/types";

export const AppProductHome = () => {
	const { width } = useWindowSize();

	return (
		<a href="https://hacknotes.yashgupta.dev">
			{width > 1280 ? (
				<img src={WordMark} alt="Hacknotes" height="30px" />
			) : (
				<img src={LogoIcon} alt="Hacknotes" height="30px" />
			)}
		</a>
	);
};

export const AppProfile = () => {
	const user = useSelector<AppStore, User | null>((store) => store.user.user);
	const dispatch = useDispatch();

	return (
		<Profile
			onClick={() => dispatch(openDrawer(DrawerModes.PROFILE))}
			tooltip={user?.username}
			icon={
				<img
					src={user?.avatar}
					alt="avatar"
					width={30}
					height={30}
					style={{ borderRadius: "50%" }}
				/>
			}
		/>
	);
};

export const AppLogout = () => {
	const dispatch = useDispatch();
	const handleLogout = () => dispatch(logout());
	return <SignIn tooltip="Logout" onClick={handleLogout} />;
};

export const NoteSearch = () => (
	<Search placeholder="Search Notes..." tooltip="Search" label="Search" />
);

export const AppSettings = () => {
	const dispatch = useDispatch();

	return (
		<Settings
			onClick={() => dispatch(openDrawer(DrawerModes.SETTINGS))}
			tooltip="Product settings"
		/>
	);
};

export const AppNotifications = () => (
	<Notifications badge={() => <div />} tooltip="Notifications" />
);
