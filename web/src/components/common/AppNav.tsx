import HomeIcon from "@atlaskit/icon/glyph/home";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import { colors } from "@atlaskit/theme";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { NavButton } from "./AppButton";
import { AppDrawer } from "./AppDrawer";
import ArchiveIcon from "./ArchiveIcon";
import { AppLogout, AppProductHome, AppProfile } from "./NavComponents";

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
	const history = useHistory();
	return (
		<NavContainer>
			<NavItems>
				<AppProductHome />
				<NavButton
					iconBefore={<HomeIcon label="Home" />}
					onClick={() => history.push("/")}
				>
					Home
				</NavButton>
				<NavButton
					iconBefore={<ArchiveIcon />}
					onClick={() => history.push("/archive")}
				>
					Archive
				</NavButton>
				<NavButton
					iconBefore={<TrashIcon label="trash" />}
					onClick={() => history.push("/trash")}
				>
					Trash
				</NavButton>
			</NavItems>
			<NavItems>
				<AppProfile />
				<AppLogout />
			</NavItems>
			<AppDrawer />
		</NavContainer>
	);
};
