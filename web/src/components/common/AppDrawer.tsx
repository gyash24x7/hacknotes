import Avatar from "@atlaskit/avatar";
import { ButtonGroup } from "@atlaskit/button";
import Drawer from "@atlaskit/drawer";
import SaveIcon from "@atlaskit/icon/glyph/file";
import RandomIcon from "@atlaskit/icon/glyph/refresh";
import { colors } from "@atlaskit/theme";
import is from "is_js";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import client from "superagent";
import { AppStore } from "../../store";
import { closeDrawer } from "../../store/drawer";
import { DrawerModes, User } from "../../utils/types";
import { AppButton } from "./AppButton";
import { VerticalSpacer } from "./VerticalSpacer";

export const DrawerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	width: calc(100% - 64px);
`;

export const DrawerHeader = styled.div`
	height: 40px;
	display: flex;
	width: 100%;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
	font-family: "Montserrat";
`;

export const DrawerHelperText = styled.div`
	text-transform: uppercase;
	font-size: 12px;
	color: ${colors.N200};
`;

export const DrawerPrimaryText = styled.div`
	font-size: 18px;
`;

export const DrawerSecondaryText = styled.div`
	color: ${colors.B500};
	font-weight: bold;
`;

export const AvatarWrapper = styled.div`
	text-align: center;
	font-family: "Montserrat";
	padding-bottom: 10vh;
`;

export const StyledAvatar = styled.div`
	cursor: pointer;
`;

export const AppDrawer = () => {
	const mode = useSelector<AppStore, DrawerModes | null>(
		(store) => store.drawer.mode
	);
	const dispatch = useDispatch();

	return (
		<Drawer
			isOpen={is.not.equal(mode, DrawerModes.CLOSED)}
			onClose={() => dispatch(closeDrawer())}
		>
			<DrawerWrapper>
				<DrawerHeader>{mode}</DrawerHeader>
				{is.equal(mode, DrawerModes.PROFILE) ? (
					<ProfileDrawer />
				) : (
					<div>Hello from Settings</div>
				)}
				<div></div>
			</DrawerWrapper>
		</Drawer>
	);
};

export const ProfileDrawer = () => {
	const user = useSelector<AppStore, User | null>((store) => store.user.user);
	const [randomAvatar, setRandomAvatar] = useState(user?.avatar);
	const [isAvatarControlsOpen, setIsAvatarControlsOpen] = useState(false);

	const toggleAvatarControls = () => setIsAvatarControlsOpen((val) => !val);

	const getRandomAvatar = () => {
		client
			.get(`${process.env.REACT_APP_API_URL}/avatar/random`)
			.then(({ body: { url } }) => setRandomAvatar(url))
			.catch(console.log);
	};

	return (
		<AvatarWrapper>
			<StyledAvatar onClick={toggleAvatarControls}>
				<Avatar src={randomAvatar} size="xxlarge" />
			</StyledAvatar>
			<VerticalSpacer size={10} />
			{isAvatarControlsOpen ? (
				<Fragment>
					<AppButton
						iconBefore={<RandomIcon label="Random Avatar" size="small" />}
						appearance="default"
						spacing="compact"
						onClick={getRandomAvatar}
					>
						Random
					</AppButton>
					<VerticalSpacer size={10} />
					<ButtonGroup>
						<AppButton
							iconBefore={<SaveIcon label="Save Avatar" size="small" />}
							appearance="primary"
							spacing="compact"
						>
							Save
						</AppButton>
						<AppButton
							iconBefore={<SaveIcon label="Save Avatar" size="small" />}
							appearance="danger"
							spacing="compact"
							onClick={() => setRandomAvatar(user?.avatar)}
						>
							Discard
						</AppButton>
					</ButtonGroup>
				</Fragment>
			) : (
				<DrawerHelperText>Click on avatar to modify</DrawerHelperText>
			)}
			<VerticalSpacer size={20} />
			<DrawerPrimaryText>{user?.name}</DrawerPrimaryText>
			<VerticalSpacer size={5} />
			<DrawerSecondaryText>@{user?.username}</DrawerSecondaryText>
		</AvatarWrapper>
	);
};
