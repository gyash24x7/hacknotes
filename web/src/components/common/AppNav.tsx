import { colors } from "@atlaskit/theme";
import React from "react";
import styled from "styled-components";
import { AppDrawer } from "./AppDrawer";
import {
	AppLogout,
	AppNotifications,
	AppProductHome,
	AppProfile,
	AppSettings,
	NoteSearch
} from "./NavComponents";

const NavContainer = styled.div`
	position: fixed;
	width: 100vw;
	top: 0;
	z-index: 100;
	height: 70px;
	box-shadow: 0px 0px 5px ${colors.N50};
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.N0};
`;

const NavItems = styled.div`
	padding: 5px 20px;
	display: flex;
	align-items: center;
`;

export const AppNav = () => {
	return (
		<NavContainer>
			<NavItems>
				<AppProductHome />
			</NavItems>
			<NavItems>
				<NoteSearch />
				<AppNotifications />
				<AppSettings />
				<AppProfile />
				<AppLogout />
			</NavItems>
			<AppDrawer />
		</NavContainer>
	);
};
