import { useNavigation } from "@react-navigation/native";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { ImageProps } from "react-native";

export const CreateNote = () => {
	const navigation = useNavigation();
	const handleOnPress = () => navigation.navigate("ViewNote", {});

	const renderNavigationActionIcon = () => (props?: Partial<ImageProps>) => (
		<Icon name="edit-2" {...props} size="xlarge" />
	);

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon()}
			onPress={handleOnPress}
		/>
	);
};
