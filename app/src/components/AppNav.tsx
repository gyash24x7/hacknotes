import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
	Drawer,
	DrawerItem,
	Icon,
	IndexPath,
	Layout,
	Text,
	TopNavigation,
	TopNavigationAction
} from "@ui-kitten/components";
import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { logout } from "../store/user/thunks";
import { AppLogoSmall } from "./AppLogo";
import { AppWordmark } from "./AppWordmark";

export const TopNav = () => {
	const navigation = useNavigation();

	return (
		<Fragment>
			<StatusBar backgroundColor="white" barStyle="dark-content" />
			<TopNavigation
				style={{ height: 70, zIndex: 100 }}
				title={() => <AppWordmark />}
				alignment="start"
				accessoryLeft={() => (
					<TopNavigationAction
						icon={(props) => <Icon name="menu" {...props} size="xlarge" />}
						onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
					/>
				)}
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
	border-bottom-width: 2px;
	border-bottom-color: #dfe1e6;
	border-right-width: 2px;
	border-right-color: #dfe1e6;
`;

export const AppDrawer = styled(Drawer)`
	border-right-width: 2px;
	border-right-color: #dfe1e6;
`;

export const DrawerItemTitle = styled(Text)`
	font-family: "montserrat-bold";
`;

const DrawerNavFooter = () => {
	const dispatch = useDispatch();

	return (
		<DrawerItem
			title={(props) => (
				<Text style={[props?.style, { fontFamily: "montserrat-bold" }]}>
					Logout
				</Text>
			)}
			accessoryLeft={(props) => (
				<Icon {...props} name={getIconNameValue("Logout", 0)} />
			)}
			onPress={() => dispatch(logout())}
		/>
	);
};

export const DrawerNav = ({
	state,
	navigation
}: DrawerContentComponentProps) => {
	return (
		<AppDrawer
			header={() => (
				<DrawerHeader>
					<AppLogoSmall />
				</DrawerHeader>
			)}
			footer={DrawerNavFooter}
			selectedIndex={new IndexPath(state.index, 0)}
			onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
		>
			{state.routes.map(({ key, name }, i) => (
				<DrawerItem
					key={key}
					title={(props) => (
						<Text style={[props?.style, { fontFamily: "montserrat-bold" }]}>
							{name}
						</Text>
					)}
					accessoryLeft={(props) => (
						<Icon {...props} name={getIconNameValue(name, state.index)} />
					)}
					style={{ backgroundColor: state.index === i ? "#dfe1e6" : "#fff" }}
				/>
			))}
		</AppDrawer>
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
