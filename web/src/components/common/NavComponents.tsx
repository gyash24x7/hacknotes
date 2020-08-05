import { Notifications, Profile, Search } from "@atlaskit/atlassian-navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "react-use";
import LogoIcon from "../../assets/icon.svg";
import WordMark from "../../assets/wordmark.svg";
import { AppStore } from "../../store";
import { openDrawer } from "../../store/drawer";
import { logout } from "../../store/user/thunks";
import { DrawerModes, User } from "../../utils/types";
import LogoutIcon from "../icons/LogoutIcon";
import { NavButton } from "./AppButton";

export const AppProductHome = () => {
	const { width } = useWindowSize();

	return (
		<a href="https://hacknotes.yashgupta.dev" style={{ marginRight: 25 }}>
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
			tooltip="Profile"
			icon={<img src={user?.avatar} alt="avatar" width={30} height={30} />}
		/>
	);
};

export const AppLogout = () => {
	const dispatch = useDispatch();
	const handleLogout = () => dispatch(logout());
	return (
		<NavButton
			tooltip="Logout"
			onClick={handleLogout}
			iconBefore={<LogoutIcon />}
			style={{ width: 32, borderRadius: "50%", margin: 5 }}
		/>
	);
};

export const NoteSearch = () => (
	<Search placeholder="Search Notes..." tooltip="Search" label="Search" />
);

export const AppNotifications = () => (
	<Notifications badge={() => <div />} tooltip="Notifications" />
);
