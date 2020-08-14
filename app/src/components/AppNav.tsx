import AsyncStorage from "@react-native-community/async-storage";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import {
	DrawerActions,
	useIsFocused,
	useNavigation
} from "@react-navigation/native";
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
import { RenderProp } from "@ui-kitten/components/devsupport";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import React, { Fragment } from "react";
import { ImageProps } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../utils/context";
import { AppLogoSmall } from "./AppLogo";
import { BoldText } from "./AppTypography";
import { AppWordmark } from "./AppWordmark";

const StyledTopNavigation = styled(TopNavigation)`
	height: 70px;
	z-index: 100;
	background-color: transparent;
`;

export const NavTitle = styled(BoldText)`
	text-transform: uppercase;
	font-size: 24px;
	line-height: 30px;
	margin-right: 10px;
`;

interface TopNavProps {
	title?: string;
	accessoryRight?: RenderProp<{}>;
	accessoryLeft?: RenderProp<{}>;
}

export const renderNavigationActionIcon = (name: string) => (
	props?: Partial<ImageProps>
) => <Icon name={name} {...props} size="xlarge" />;

export const renderMenuButton = () => () => {
	const navigation = useNavigation();

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon("menu")}
			onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
		/>
	);
};

export const renderBackButton = () => () => {
	const navigation = useNavigation();

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon("arrow-back")}
			onPress={() => navigation.goBack()}
		/>
	);
};

export const TopNav = ({
	title,
	accessoryRight,
	accessoryLeft
}: TopNavProps) => {
	return (
		<Fragment>
			<FocusAwareStatusBar backgroundColor="transparent" style="dark" />
			<StyledTopNavigation
				title={() => (title ? <NavTitle>{title}</NavTitle> : <AppWordmark />)}
				accessoryLeft={accessoryLeft || renderMenuButton()}
				accessoryRight={accessoryRight}
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

	const renderAccessoryLeft = () => () => (
		<DrawerItemIcon name={getIconNameValue("Logout", 0)} />
	);

	return (
		<DrawerItem
			title={() => <DrawerItemTitle>Logout</DrawerItemTitle>}
			accessoryLeft={renderAccessoryLeft()}
			onPress={handleLogout}
		/>
	);
};

export const DrawerNav = (props: DrawerContentComponentProps) => {
	const { state, navigation } = props;

	const renderDrawerHeader = () => () => (
		<DrawerHeader>
			<AppLogoSmall />
		</DrawerHeader>
	);

	const renderDrawerFooter = () => DrawerNavFooter;

	const renderDrawerItemTitle = (name: string, isSelected: boolean) => () => (
		<DrawerItemTitle isSelected={isSelected}>{name}</DrawerItemTitle>
	);

	const renderDrawerItemIcon = (iconName: string, fill: string) => () => (
		<DrawerItemIcon name={iconName} fill={fill} />
	);

	return (
		<Drawer
			header={renderDrawerHeader()}
			footer={renderDrawerFooter()}
			selectedIndex={new IndexPath(state.index, 0)}
			onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
		>
			{state.routes
				.filter(({ name }) => name.indexOf("Note") < 0)
				.map(({ key, name }, i) => (
					<AppDrawerItem
						key={key}
						title={renderDrawerItemTitle(name, state.index === i)}
						accessoryLeft={renderDrawerItemIcon(
							getIconNameValue(name, state.index),
							state.index === i ? "#0052cc" : "#141414"
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

export const FocusAwareStatusBar = (props: StatusBarProps) => {
	const isFocused = useIsFocused();
	return isFocused ? <StatusBar {...props} /> : null;
};
