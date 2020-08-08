import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
	Drawer,
	DrawerItem,
	Icon,
	IndexPath,
	Layout,
	TextProps,
	TopNavigation,
	TopNavigationAction
} from "@ui-kitten/components";
import React, { Fragment } from "react";
import { AsyncStorage, StatusBar } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../utils/context";
import { AppLogoSmall } from "./AppLogo";
import { BoldText } from "./AppTypography";
import { AppWordmark } from "./AppWordmark";

const StyledTopNavigation = styled(TopNavigation)`
	height: 70px;
	z-index: 100;
`;

export const NavTitle = styled(BoldText)`
	text-transform: uppercase;
	font-size: 24px;
	line-height: 30px;
	margin-right: 10px;
`;

interface TopNavProps {
	title?: string;
	isNoteScreen?: boolean;
}

export const TopNav = ({ title, isNoteScreen }: TopNavProps) => {
	const navigation = useNavigation();

	return (
		<Fragment>
			<StatusBar backgroundColor="white" barStyle="dark-content" />
			<StyledTopNavigation
				title={() => (title ? <NavTitle>{title}</NavTitle> : <AppWordmark />)}
				alignment="start"
				accessoryLeft={() =>
					!isNoteScreen ? (
						<TopNavigationAction
							icon={(props) => <Icon name="menu" {...props} size="xlarge" />}
							onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
						/>
					) : (
						<TopNavigationAction
							icon={(props) => (
								<Icon name="arrow-back" {...props} size="xlarge" />
							)}
							onPress={() => navigation.goBack()}
						/>
					)
				}
			/>
		</Fragment>
	);
};

export const DrawerHeader = styled(Layout)`
	display: flex;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 150px;
`;

export const AppDrawerItem = styled(DrawerItem)<any>`
	background-color: ${({ isSelected }) => (isSelected ? "#deebff" : "#fff")};
`;

export const DrawerItemTitle = styled(BoldText)<
	TextProps & { isSelected?: boolean }
>`
	flex: 1;
	text-align: left;
	font-size: 13px;
	color: ${({ isSelected }) => (isSelected ? "#0052cc" : "#141414")};
`;

export const DrawerItemIcon = styled(Icon)<any>`
	width: 20px;
	height: 20px;
	margin: auto 8px;
`;

const DrawerNavFooter = () => {
	const { setIsAuthenticated } = useAuth();
	const handleLogout = async () => {
		await AsyncStorage.removeItem("authToken");
		setIsAuthenticated(false);
	};

	return (
		<DrawerItem
			title={() => <DrawerItemTitle>Logout</DrawerItemTitle>}
			accessoryLeft={() => (
				<DrawerItemIcon name={getIconNameValue("Logout", 0)} />
			)}
			onPress={handleLogout}
		/>
	);
};

export const DrawerNav = ({
	state,
	navigation
}: DrawerContentComponentProps) => {
	return (
		<Drawer
			header={() => (
				<DrawerHeader>
					<AppLogoSmall />
				</DrawerHeader>
			)}
			footer={DrawerNavFooter}
			selectedIndex={new IndexPath(state.index, 0)}
			onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
		>
			{state.routes
				.filter(({ name }) => name !== "Note")
				.map(({ key, name }, i) => (
					<AppDrawerItem
						key={key}
						title={() => (
							<DrawerItemTitle isSelected={state.index === i}>
								{name}
							</DrawerItemTitle>
						)}
						accessoryLeft={() => (
							<DrawerItemIcon
								name={getIconNameValue(name, state.index)}
								fill={state.index === i ? "#0052cc" : "#141414"}
							/>
						)}
						isSelected={state.index === i}
					/>
				))}
		</Drawer>
	);
};

const getIconNameValue = (screen: string, index: number) => {
	switch (screen) {
		case "Home":
			return index === 0 ? "home" : "home-outline";
		case "Archive":
			return index === 1 ? "archive" : "archive-outline";
		case "Trash":
			return index === 2 ? "trash" : "trash-outline";
		case "Profile":
			return index === 3 ? "person" : "person-outline";
	}

	return "log-out";
};
