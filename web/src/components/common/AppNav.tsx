import { colors } from "@atlaskit/theme";
import is from "is_js";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import ArchiveIcon from "../icons/ArchiveIcon";
import HomeIcon from "../icons/HomeIcon";
import TrashIcon from "../icons/TrashIcon";
import { NavButton } from "./AppButton";
import { AppDrawer } from "./AppDrawer";
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
	const { pathname } = useLocation();

	return (
		<NavContainer>
			<NavItems>
				<AppProductHome />
				<NavButton
					iconBefore={<HomeIcon filled={is.equal(pathname, "/")} />}
					isSelected={is.equal(pathname, "/")}
					onClick={() => history.push("/")}
				>
					Home
				</NavButton>
				<NavButton
					iconBefore={<ArchiveIcon filled={is.equal(pathname, "/archive")} />}
					onClick={() => history.push("/archive")}
					isSelected={is.equal(pathname, "/archive")}
				>
					Archive
				</NavButton>
				<NavButton
					iconBefore={<TrashIcon filled={is.equal(pathname, "/trash")} />}
					isSelected={is.equal(pathname, "/trash")}
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
