import {
	AtlassianNavigation,
	CustomProductHome,
	Notifications,
	Profile,
	Search,
	Settings
} from "@atlaskit/atlassian-navigation";
import React from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import LogoIcon from "../../assets/icon.svg";
import WordMark from "../../assets/wordmark.svg";

const NavContainer = styled.div`
	position: fixed;
	width: 100vw;
	top: 0;
	z-index: 100;
`;

export const Navbar = () => {
	const { width } = useWindowSize();
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
				renderProfile={() => (
					<Profile
						tooltip="Profile"
						icon={
							<img
								src="https://source.unsplash.com/featured/100x100"
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
			/>
		</NavContainer>
	);
};
