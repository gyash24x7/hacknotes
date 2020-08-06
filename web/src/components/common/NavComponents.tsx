import { Notifications, Profile, Search } from "@atlaskit/atlassian-navigation";
import React, { useContext } from "react";
import { queryCache } from "react-query";
import { useWindowSize } from "react-use";
import LogoIcon from "../../assets/icon.svg";
import WordMark from "../../assets/wordmark.svg";
import { AuthContext } from "../../utils/context";
import { User } from "../../utils/types";
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
	let data: User | undefined = queryCache.getQueryData("me");
	return (
		<Profile
			tooltip="Profile"
			icon={<img src={data?.avatar} alt="avatar" width={30} height={30} />}
		/>
	);
};

export const AppLogout = () => {
	const { setIsAuthenticated } = useContext(AuthContext);
	const handleLogout = () => {
		localStorage.removeItem("authToken");
		setIsAuthenticated(false);
	};

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
