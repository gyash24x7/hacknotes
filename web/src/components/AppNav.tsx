import { Profile } from "@atlaskit/atlassian-navigation";
import { colors } from "@atlaskit/theme";
import React, { useState } from "react";
import { queryCache } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import LogoIcon from "../assets/icon.svg";
import WordMark from "../assets/wordmark.svg";
import { useAuth } from "../utils/context";
import { User } from "../utils/types";
import { NavButton } from "./AppButton";
import { AppDrawer } from "./AppDrawer";
import ArchiveIcon from "./icons/ArchiveIcon";
import HomeIcon from "./icons/HomeIcon";
import LogoutIcon from "./icons/LogoutIcon";
import TrashIcon from "./icons/TrashIcon";

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
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { setIsAuthenticated } = useAuth();
	const { width } = useWindowSize();
	let data: User | undefined = queryCache.getQueryData("me");

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		setIsAuthenticated(false);
	};

	return (
		<NavContainer>
			<NavItems>
				<a href="https://hacknotes.yashgupta.dev" style={{ marginRight: 25 }}>
					<img
						src={width > 1280 ? WordMark : LogoIcon}
						alt="Hacknotes"
						height="30px"
					/>
				</a>
				<NavButton
					iconBefore={<HomeIcon filled={pathname === "/"} />}
					isSelected={pathname === "/"}
					onClick={() => history.push("/")}
				>
					Home
				</NavButton>
				<NavButton
					iconBefore={<ArchiveIcon filled={pathname === "/archive"} />}
					onClick={() => history.push("/archive")}
					isSelected={pathname === "/archive"}
				>
					Archive
				</NavButton>
				<NavButton
					iconBefore={<TrashIcon filled={pathname === "/trash"} />}
					isSelected={pathname === "/trash"}
					onClick={() => history.push("/trash")}
				>
					Trash
				</NavButton>
			</NavItems>
			<NavItems>
				<Profile
					onClick={() => setIsDrawerOpen(true)}
					tooltip="Profile"
					icon={<img src={data?.avatar} alt="avatar" width={30} height={30} />}
				/>
				<NavButton
					tooltip="Logout"
					onClick={handleLogout}
					iconBefore={<LogoutIcon />}
					style={{ width: 32, borderRadius: "50%", margin: 5 }}
				/>
			</NavItems>
			<AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
		</NavContainer>
	);
};
