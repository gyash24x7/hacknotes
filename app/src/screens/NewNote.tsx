import { DrawerScreenProps } from "@react-navigation/drawer";
import { Layout, LayoutProps } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { queryCache, useMutation } from "react-query";
import styled from "styled-components/native";
import { createNote } from "../api/notes";
import { AppContainer } from "../components/AppContainer";
import { TopNav } from "../components/AppNav";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { AppScreenParamList, Note, NoteColors } from "../utils/types";

const ViewNoteCardContainer = styled(Layout)<LayoutProps & { color: string }>`
	flex: 1;
	background-color: ${({ color }) => color};
	padding: 10px 20px;
	width: 100%;
`;

const NoteTitleInput = styled(TextInput)`
	color: #141414;
	font-size: 18px;
	font-family: "montserrat-bold";
	font-weight: normal;
`;

const NoteContentInput = styled(TextInput)`
	color: #141414;
	font-size: 14px;
	font-family: "montserrat-regular";
	flex: 1;
	text-align-vertical: top;
`;

export const NewNoteScreen = ({
	navigation
}: DrawerScreenProps<AppScreenParamList, "NewNote">) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const [create] = useMutation(createNote, {
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>("notes", (notes) =>
				[data].concat(...(notes || []))
			);
			setTitle("");
			setContent("");
		}
	});

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			if (!!title || !!content)
				create({
					title,
					content: JSON.stringify({ blocks: content.split("\n") })
				});
		});

		return () => unsubscribe();
	}, [navigation, title, content]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav title=" " screen="NewNote" color="TRANSPARENT" />
			<AppContainer>
				<ViewNoteCardContainer color={NoteColors["TRANSPARENT"]}>
					<NoteTitleInput
						value={title}
						placeholder="Title"
						placeholderTextColor="#14141466"
						onChangeText={(val) => setTitle(val)}
						multiline
					/>
					<VerticalSpacer />
					<NoteContentInput
						value={content}
						onChangeText={setContent}
						placeholder="Content"
						placeholderTextColor="#14141466"
						multiline
					/>
				</ViewNoteCardContainer>
			</AppContainer>
		</SafeAreaView>
	);
};
