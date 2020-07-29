import { CustomProductHome, Profile } from "@atlaskit/atlassian-navigation";
import React from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";
import LogoIcon from "../../assets/icon.svg";
import WordMark from "../../assets/wordmark.svg";
import { AppStore } from "../../store";
import { User } from "../../utils/types";

export const AppProductHome = () => {
	const { width } = useWindowSize();

	return (
		<CustomProductHome
			iconUrl={LogoIcon}
			logoUrl={WordMark}
			iconAlt="Hacknotes"
			logoAlt="Hacknotes"
			href="#"
			css={{
				alignItems: "left",
				paddingRight: 20,
				width: width >= 1280 ? 205 : 30
			}}
		/>
	);
};

export const AppProfile = () => {
	const user = useSelector<AppStore, User | null>((store) => store.user.user);

	return (
		<Profile
			tooltip={user?.username}
			icon={
				<img
					src={user?.avatar}
					alt="avatar"
					width={24}
					height={24}
					style={{ borderRadius: "50%" }}
				/>
			}
		/>
	);
};
