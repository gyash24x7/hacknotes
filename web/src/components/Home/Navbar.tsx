import {
	AtlassianNavigation,
	CustomProductHome,
	Notifications,
	Profile,
	Search,
	Settings,
	SignIn
} from "@atlaskit/atlassian-navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import LogoIcon from "../../assets/icon.svg";
import WordMark from "../../assets/wordmark.svg";
import { AppStore } from "../../store";
import { logout } from "../../store/user/thunks";
import { User } from "../../utils/types";

const NavContainer = styled.div`
	position: fixed;
	width: 100vw;
	top: 0;
	z-index: 100;
`;

export const Navbar = () => {
	const { width } = useWindowSize();
	const user = useSelector<AppStore, User | null>((store) => store.user.user);
	const dispatch = useDispatch();

	return (
		<NavContainer>
			<AtlassianNavigation
				label="site"
				primaryItems={[]}
				renderProductHome={() => (
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
				)}
				renderSignIn={() => (
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
				)}
				renderSearch={() => (
					<Search
						placeholder="Search Notes..."
						tooltip="Search"
						label="Search"
					/>
				)}
				renderSettings={() => (
					<Settings onClick={console.log} tooltip="Product settings" />
				)}
				renderNotifications={() => (
					<Notifications badge={() => <div />} tooltip="Notifications" />
				)}
				renderProfile={() => (
					<SignIn tooltip="Logout" onClick={() => dispatch(logout())} />
				)}
			/>
		</NavContainer>
	);
};
