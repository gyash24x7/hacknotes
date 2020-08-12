import Avatar from "@atlaskit/avatar";
import { ButtonGroup } from "@atlaskit/button";
import Drawer from "@atlaskit/drawer";
import { colors } from "@atlaskit/theme";
import React, { Fragment, useState } from "react";
import { queryCache } from "react-query";
import styled from "styled-components";
import client from "superagent";
import { useUpdateAvatarMutation } from "../utils/hooks";
import { User } from "../utils/types";
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

interface AppDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AppDrawer = ({ isOpen, onClose }: AppDrawerProps) => {
	return (
		<Drawer isOpen={isOpen} onClose={onClose}>
			<DrawerWrapper>
				<DrawerHeader>Profile</DrawerHeader>
				<ProfileDrawer />
				<div></div>
			</DrawerWrapper>
		</Drawer>
	);
};

export const ProfileDrawer = () => {
	const user = queryCache.getQueryData<User | undefined>("me");
	const [randomAvatar, setRandomAvatar] = useState(user?.avatar);
	const [isAvatarControlsOpen, setIsAvatarControlsOpen] = useState(false);
	const [update, { isLoading }] = useUpdateAvatarMutation();

	const toggleAvatarControls = () => setIsAvatarControlsOpen((val) => !val);

	const getRandomAvatar = () =>
		client
			.get(`${process.env.REACT_APP_API_URL}/avatar/random`)
			.then(({ body: { url } }) => setRandomAvatar(url))
			.catch(console.log);

	const changeAvatar = () => {
		update({ avatar: randomAvatar! });
		setIsAvatarControlsOpen(false);
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
						appearance="default"
						spacing="compact"
						onClick={getRandomAvatar}
						shouldFitContainer
					>
						Random
					</AppButton>
					<VerticalSpacer size={10} />
					<ButtonGroup>
						<AppButton
							appearance="primary"
							spacing="compact"
							onClick={changeAvatar}
							isLoading={isLoading}
						>
							Save
						</AppButton>
						<AppButton
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
