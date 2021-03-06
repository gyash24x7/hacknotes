import { Icon, Layout, Spinner } from "@ui-kitten/components";
import React, { Fragment, useState } from "react";
import { Platform, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import { queryCache } from "react-query";
import styled from "styled-components/native";
import client from "superagent";
import { AppButton, BtnGroup } from "../components/AppButton";
import { AppContainer } from "../components/AppContainer";
import { TopNav } from "../components/AppNav";
import { BoldText, ButtonText, LinkText } from "../components/AppTypography";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { useUpdateAvatarMutation } from "../utils/hooks";
import { User } from "../utils/types";

const AvatarSpinnerContainer = styled(Layout)`
	position: absolute;
	width: 150px;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ffffff80;
	z-index: 2;
`;

export const ProfileScreen = () => {
	const user = queryCache.getQueryData<User | undefined>("me");
	const [randomAvatar, setRandomAvatar] = useState(user!.avatar);
	const [isAvatarControlsOpen, setIsAvatarControlsOpen] = useState(false);
	const [update, { isLoading }] = useUpdateAvatarMutation({
		onSuccess: () => {
			if (Platform.OS === "android")
				ToastAndroid.show("Avatar Updated!", ToastAndroid.LONG);
		}
	});
	const [avatarLoading, setAvatarLoading] = useState(false);

	const toggleAvatarControls = () => setIsAvatarControlsOpen((val) => !val);

	const getRandomAvatar = () => {
		setAvatarLoading(true);
		client
			.get(`https://hacknotes-server.yashgupta.dev/api/avatar/random`)
			.then(({ body: { url } }) => {
				setRandomAvatar(url);
				setAvatarLoading(false);
			})
			.catch(console.log);
	};

	const changeAvatar = () => {
		update({ avatar: randomAvatar! });
		setIsAvatarControlsOpen(false);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<TopNav title="Profile" />
			<AppContainer>
				<Layout>
					{avatarLoading && (
						<AvatarSpinnerContainer>
							<Spinner size="giant" />
						</AvatarSpinnerContainer>
					)}
					<SvgUri
						uri={randomAvatar}
						width={150}
						height={150}
						onPress={toggleAvatarControls}
					/>
				</Layout>
				<VerticalSpacer />
				{isAvatarControlsOpen ? (
					<Fragment>
						<AppButton
							children={() => <ButtonText category="label">Random</ButtonText>}
							accessoryLeft={(props) => <Icon {...props} name="shuffle-2" />}
							status="info"
							onPress={getRandomAvatar}
							size="small"
						/>
						<VerticalSpacer size={5} />
						<BtnGroup>
							<AppButton
								children={() =>
									isLoading ? (
										<Spinner status="control" />
									) : (
										<ButtonText category="label">Save</ButtonText>
									)
								}
								style={{ minWidth: 90, marginHorizontal: 5 }}
								onPress={changeAvatar}
								size="small"
							/>
							<AppButton
								children={() => (
									<ButtonText category="label">Discard</ButtonText>
								)}
								style={{ minWidth: 90, marginHorizontal: 5 }}
								status="danger"
								size="small"
								onPress={() => setRandomAvatar(user!.avatar)}
							/>
						</BtnGroup>
					</Fragment>
				) : (
					<BoldText status="info" category="label">
						CLICK ON AVATAR TO CHANGE
					</BoldText>
				)}
				<VerticalSpacer />
				<BoldText category="h5">{user?.name}</BoldText>
				<LinkText>{"@" + user?.username}</LinkText>
			</AppContainer>
		</SafeAreaView>
	);
};
